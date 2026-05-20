import {
  formatChatTranscript,
  truncateTranscript,
  type ChatTranscriptMessage,
} from "@/src/lib/chatTranscript";
import type { ChatVisitor } from "@/lib/chatVisitor";
import type { LeadPayload } from "@/lib/submitLead";

export const MIN_CHAT_MESSAGES_TO_REPORT = 5;

export function buildChatSummaryPayload(
  messages: ChatTranscriptMessage[],
  sessionId: string,
  visitor: ChatVisitor | null
): LeadPayload {
  const userMessages = messages.filter((m) => m.role === "user");
  const transcript = truncateTranscript(formatChatTranscript(messages));
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return {
    _subject: `Chat Guia PCD - ${userMessages.length} perguntas (${now})`,
    _replyto: visitor?.email,
    name: visitor?.name,
    email: visitor?.email,
    origem: "Resumo do chat",
    session: sessionId || "desconhecido",
    data: now,
    total_mensagens: String(messages.length),
    perguntas_visitante: String(userMessages.length),
    transcricao: transcript,
  };
}

export function shouldReportChat(messagesCount: number): boolean {
  return messagesCount >= MIN_CHAT_MESSAGES_TO_REPORT;
}
