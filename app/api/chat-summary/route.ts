const FORMSUBMIT_URL = "https://formsubmit.co/ajax";
const MIN_MESSAGES = 5;

type MessageEntry = { role: "user" | "assistant"; content: string };

function formatTranscript(messages: MessageEntry[]): string {
  return messages
    .map((m, i) => {
      const label = m.role === "user" ? "Visitante" : "Lia";
      return `[${i + 1}] ${label}: ${m.content}`;
    })
    .join("\n\n");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages: MessageEntry[] = Array.isArray(body?.messages)
      ? body.messages
      : [];

    if (messages.length < MIN_MESSAGES) {
      return Response.json({ skipped: true, reason: "below_min_messages" });
    }

    const email = process.env.NEXT_PUBLIC_LEAD_EMAIL?.trim();
    if (!email) {
      return Response.json(
        { error: "E-mail de destino não configurado." },
        { status: 500 }
      );
    }

    const userMessages = messages.filter((m) => m.role === "user");
    const transcript = formatTranscript(messages);
    const sessionId =
      typeof body?.sessionId === "string" ? body.sessionId : "desconhecido";
    const now = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    const res = await fetch(
      `${FORMSUBMIT_URL}/${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Chat Guia PCD - ${userMessages.length} perguntas (${now})`,
          _captcha: "false",
          session: sessionId,
          data: now,
          total_mensagens: String(messages.length),
          perguntas_visitante: String(userMessages.length),
          transcricao: transcript,
        }),
      }
    );

    const responseText = await res.text().catch(() => "");

    if (!res.ok) {
      console.error("[chat-summary] FormSubmit error:", res.status, responseText);
      return Response.json(
        { error: `Falha ao enviar e-mail: ${res.status}` },
        { status: 500 }
      );
    }

    console.log("[chat-summary] Enviado com sucesso:", responseText);
    return Response.json({ sent: true });
  } catch (err) {
    console.error("[chat-summary] Erro interno:", err);
    const msg = err instanceof Error ? err.message : "Erro desconhecido";
    return Response.json({ error: msg }, { status: 500 });
  }
}
