/** Limite para evitar rejeição do FormSubmit em transcrições muito longas. */
export const MAX_CHAT_TRANSCRIPT_CHARS = 48_000;

export type ChatTranscriptMessage = { role: "user" | "assistant"; content: string };

export function formatChatTranscript(messages: ChatTranscriptMessage[]): string {
  return messages
    .map((m, i) => {
      const label = m.role === "user" ? "Visitante" : "Lia";
      return `[${i + 1}] ${label}: ${m.content}`;
    })
    .join("\n\n");
}

export function truncateTranscript(text: string, max = MAX_CHAT_TRANSCRIPT_CHARS): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + "\n\n[Transcrição truncada por tamanho.]";
}
