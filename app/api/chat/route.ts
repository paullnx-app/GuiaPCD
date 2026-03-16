import { GoogleGenerativeAI } from "@google/generative-ai";
import { SITE_CONFIG_TEXT } from "@/src/constants/config";
import { getPostsContext } from "@/src/constants/posts";
import fs from "fs";
import path from "path";

const MAX_MESSAGES_PER_SESSION = 30;
const sessionMessageCount = new Map<string, number>();

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=553132361498";

function loadChatRules(): string {
  const rulesPath = path.join(process.cwd(), "chat-rules.md");
  if (fs.existsSync(rulesPath)) {
    return fs.readFileSync(rulesPath, "utf-8").trim();
  }
  return "";
}

function getSiteContext(): string {
  const posts = getPostsContext();
  return `${SITE_CONFIG_TEXT}\n\n---\n\n# Artigos do Blog\n\n${posts}`.trim();
}

function buildSystemInstruction(chatRules: string, siteContext: string): string {
  return `${chatRules}

---

## Contexto do site (use como única fonte de verdade)

${siteContext}

---

## Link do WhatsApp

Sempre que orientar o visitante a falar com a equipe, use este link clicável: ${WHATSAPP_LINK}`;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return Response.json(
        { error: "API do assistente não configurada." },
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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemInstruction(chatRules, siteContext),
    });

    const chatHistory = history
      .filter(
        (h: unknown) =>
          h &&
          typeof h === "object" &&
          "role" in h &&
          "content" in h &&
          typeof (h as { role: string; content: string }).content === "string"
      )
      .map((h: { role: string; content: string }) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: (h as { content: string }).content }],
      }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const response = result.response;
    const candidate = response.candidates?.[0];
    const text =
      candidate?.content?.parts
        ?.map((p) => ("text" in p ? p.text : ""))
        .join("")
        .trim() ||
      "Não foi possível gerar uma resposta. Entre em contato pelo WhatsApp (31) 3236-1498.";

    if (sessionId) {
      sessionMessageCount.set(sessionId, count + 1);
    }

    return Response.json({ content: text });
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
