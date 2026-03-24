import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { SITE_CONFIG_TEXT } from "@/src/constants/config";
import { CHAT_RULES_BUNDLED } from "@/src/constants/chatRulesBundled";
import { getPostsContext } from "@/src/constants/posts";
import fs from "fs";
import path from "path";

/** Modelo mais econômico da família Claude 3 (Haiku). */
const ANTHROPIC_MODEL = "claude-3-haiku-20240307";

/** Vercel: até 60s no Pro; no Hobby o teto é 10s — contexto truncado abaixo ajuda a caber no tempo. */
export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_SITE_CONTEXT_CHARS = 55000;
const MAX_MESSAGES_PER_SESSION = 30;
const sessionMessageCount = new Map<string, number>();

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

Inclua a tag exata \`[CTA_WHATSAPP]\` **somente** quando as regras acima permitirem (pedido explícito de contato/orçamento/iniciar processo, ou uma única vez se não houver resposta no site e o visitante quiser canal direto). **Não** coloque essa tag em respostas informativas comuns. Não cole URLs de WhatsApp em toda resposta.`;
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

    const out =
      text?.trim() ||
      "Não foi possível gerar uma resposta. Entre em contato pelo WhatsApp (31) 3236-1498.";

    if (sessionId) {
      sessionMessageCount.set(sessionId, count + 1);
    }

    return Response.json({ content: out });
  } catch (err) {
    console.error("[api/chat]", err);
    const msg = err instanceof Error ? err.message : "Erro ao processar.";
    return Response.json(
      {
        content: `Desculpe, ocorreu um erro. ${msg} Você pode nos contactar pelo WhatsApp (31) 3236-1498.`,
      },
      { status: 500 }
    );
  }
}
