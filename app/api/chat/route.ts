import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { SITE_CONFIG_TEXT } from "@/src/constants/config";
import { CHAT_RULES_BUNDLED } from "@/src/constants/chatRulesBundled";
import { getPostsContext } from "@/src/constants/posts";
import fs from "fs";
import path from "path";

/**
 * Haiku mais recente na API (substitui claude-3-haiku-20240307, depreciado).
 * Alias estável: https://docs.anthropic.com/en/docs/about-claude/models
 */
const ANTHROPIC_MODEL = "claude-haiku-4-5";

/** Vercel: até 60s no Pro; no Hobby o teto é 10s — contexto truncado abaixo ajuda a caber no tempo. */
export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_SITE_CONTEXT_CHARS = 55000;
const MAX_MESSAGES_PER_SESSION = 30;
const sessionMessageCount = new Map<string, number>();

const CTA_WHATSAPP_TAG = "[CTA_WHATSAPP]";
const CTA_CALENDLY_TAG = "[CTA_CALENDLY]"; // legado: convertido para WhatsApp

function normalizeUserText(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Visitante pediu marcar horário, agendar, Calendly ou equivalente → WhatsApp. */
function userMessageRequestsScheduling(text: string): boolean {
  const t = normalizeUserText(text);
  if (/\bcalendly\b/.test(t)) return true;
  if (/\bagendar\b|\bagendamento\b|\bagendo\b/.test(t)) return true;
  if (/como\s+agendo|onde\s+agendo|como\s+fa[çz]o\s+para\s+agendar|como\s+eu\s+agendo/.test(t))
    return true;
  if (/marcar\s+(um\s+)?(horario|hora|call|time|conversa)/.test(t)) return true;
  if (
    /tem\s+como\s+agendar|da\s+pra\s+agendar|d[aá]\s+para\s+agendar|posso\s+agendar|quero\s+agendar|quero\s+marcar/.test(
      t
    )
  )
    return true;
  if (/marcar\s+na\s+agenda|escolher\s+um\s+horario|ver\s+horarios?\s+disponiveis?/.test(t))
    return true;
  if (
    /bot(ao)?\s*(nao|não)\s*apareceu|(nao|não)\s*vejo\s+(o\s+)?bot(ao)?|(nao|não)\s*apareceu\s+o\s+bot|sem\s+bot(ao)?|cad(e|ê)\s+o\s+bot|o\s+bot(ao)?\s*(nao|não)\s*apareceu/.test(
      t
    )
  )
    return true;
  return false;
}

function userMessageRequestsWhatsApp(text: string): boolean {
  const t = normalizeUserText(text);
  if (/\bwhatsapp\b|\bzap\b|\bwpp\b/.test(t)) return true;
  if (/\bor[cç]amento\b|\bfalar com (a )?equipe\b|\biniciar (o )?processo\b/.test(t))
    return true;
  if (/\btelefone\b|\bligar\b|\bcontato\b/.test(t)) return true;
  return userMessageRequestsScheduling(text);
}

/** Converte Calendly legado e garante [CTA_WHATSAPP] quando o visitante quer falar com a equipe. */
function ensureWhatsAppCtaInReply(reply: string, userMessage: string): string {
  let out = reply.replaceAll(CTA_CALENDLY_TAG, "").replace(/\n{3,}/g, "\n\n").trim();

  const needsCta =
    userMessageRequestsWhatsApp(userMessage) || out.includes(CTA_WHATSAPP_TAG);
  if (!needsCta) return out;
  if (out.includes(CTA_WHATSAPP_TAG)) return out;

  const suffix =
    "\n\nPara falar com a equipe, **chame no WhatsApp** pelo botão abaixo.\n\n" +
    CTA_WHATSAPP_TAG;
  return (out + suffix).trim();
}

function loadChatRules(): string {
  const rulesPath = path.join(process.cwd(), "chat-rules.md");
  try {
    if (fs.existsSync(rulesPath)) {
      const raw = fs.readFileSync(rulesPath, "utf-8").trim();
      if (raw.length > 0) return raw;
    }
  } catch {
    /* produção serverless sem arquivo no disco */
  }
  return CHAT_RULES_BUNDLED.trim();
}

function getSiteContext(): string {
  const posts = getPostsContext();
  let full = `${SITE_CONFIG_TEXT}\n\n---\n\n# Artigos do Blog\n\n${posts}`.trim();
  if (full.length > MAX_SITE_CONTEXT_CHARS) {
    full =
      full.slice(0, MAX_SITE_CONTEXT_CHARS) +
      "\n\n[Conteúdo truncado para resposta mais rápida em produção.]";
  }
  return full;
}

function buildSystemInstruction(chatRules: string, siteContext: string): string {
  return `${chatRules}

---

## Contexto do site (use como única fonte de verdade)

${siteContext}

---

## Botão de WhatsApp no chat

Inclua a tag exata \`[CTA_WHATSAPP]\` quando as regras permitirem: pedido de WhatsApp, orçamento, falar com a equipe, iniciar processo, **agendar** ou marcar horário (sempre direcione para WhatsApp, **sem** Calendly).

**Não** use \`[CTA_CALENDLY]\`. **Não** mencione agenda online. Se o visitante pedir agendar, convide para o WhatsApp com \`[CTA_WHATSAPP]\` nesta resposta.

**Nunca** diga que o botão já está visível “na mensagem anterior” sem incluir \`[CTA_WHATSAPP]\` nesta mensagem.`;
}

type ChatRole = "user" | "assistant";

function buildAnthropicMessages(
  history: unknown[],
  latestUserMessage: string
): { role: ChatRole; content: string }[] {
  const raw: { role: ChatRole; content: string }[] = [];
  for (const h of history) {
    if (!h || typeof h !== "object") continue;
    const role = (h as { role: string }).role;
    const content = (h as { content: unknown }).content;
    if (typeof content !== "string" || !content.trim()) continue;
    if (role !== "user" && role !== "assistant") continue;
    raw.push({ role, content: content.trim() });
  }

  const merged: { role: ChatRole; content: string }[] = [];
  for (const m of raw) {
    const last = merged[merged.length - 1];
    if (last && last.role === m.role) {
      last.content += "\n\n" + m.content;
    } else {
      merged.push({ ...m });
    }
  }

  while (merged.length > 0 && merged[0].role === "assistant") {
    merged.shift();
  }

  merged.push({ role: "user", content: latestUserMessage });
  return merged;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
    if (!apiKey) {
      return Response.json(
        { error: "API do assistente não configurada (ANTHROPIC_API_KEY)." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return Response.json(
        { error: "Por favor, digite uma pergunta." },
        { status: 400 }
      );
    }

    const count = sessionMessageCount.get(sessionId) ?? 0;
    if (count >= MAX_MESSAGES_PER_SESSION) {
      return Response.json({
        content:
          "Você atingiu o limite de mensagens desta sessão. Para continuar, recarregue a página ou entre em contato pelo WhatsApp (31) 3236-1498.",
      });
    }

    const siteContext = getSiteContext();
    const chatRules = loadChatRules();
    const system = buildSystemInstruction(chatRules, siteContext);
    const messages = buildAnthropicMessages(history, message);

    const provider = createAnthropic({ apiKey });
    const { text } = await generateText({
      model: provider(ANTHROPIC_MODEL),
      system,
      messages,
    });

    const rawOut =
      text?.trim() ||
      "Não foi possível gerar uma resposta. Entre em contato pelo WhatsApp (31) 3236-1498.";
    const out = ensureWhatsAppCtaInReply(rawOut, message);

    if (sessionId) {
      sessionMessageCount.set(sessionId, count + 1);
    }

    return Response.json({ content: out });
  } catch (err) {
    console.error("[api/chat]", err);
    const content =
      "Desculpe, não consegui responder agora. Tente de novo em alguns instantes ou fale conosco pelo WhatsApp (31) 3236-1498.";
    return Response.json({ content }, { status: 500 });
  }
}
