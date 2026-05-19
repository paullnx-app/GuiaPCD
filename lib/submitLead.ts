export type LeadPayload = {
  _subject: string;
  _replyto?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  origem?: string;
  transcricao?: string;
  session?: string;
  data?: string;
  total_mensagens?: string;
  perguntas_visitante?: string;
};

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; message: string; errorCode?: string };

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      message?: string;
    };

    if (!res.ok || !data.ok) {
      return {
        ok: false,
        errorCode: data.error,
        message:
          data.message ||
          "Não foi possível enviar. Tente de novo ou fale conosco pelo WhatsApp (31) 3236-1498.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      errorCode: "client_network",
      message: "Erro de conexão. Tente novamente.",
    };
  }
}
