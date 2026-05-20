import { Resend } from "resend";

type LeadBody = Record<string, unknown>;

function asString(value: unknown): string {
  if (value == null) return "";
  return String(value).trim();
}

/** Primeiro nome do lead (primeira palavra do campo nome). */
export function getLeadFirstName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0];
}

/** Assunto: `PrimeiroNome - ` + assunto base (quando há nome). */
export function buildLeadSubject(baseSubject: string, name?: string): string {
  const base = baseSubject.trim() || "Novo lead, Guia PCD";
  const first = getLeadFirstName(name ?? "");
  if (!first) return base;
  return `${first} - ${base}`;
}

function buildPlainText(body: LeadBody): string {
  const lines: string[] = [];
  const push = (label: string, key: string) => {
    const v = asString(body[key]);
    if (v) lines.push(`${label}: ${v}`);
  };

  push("Nome", "name");
  push("E-mail", "email");
  push("Telefone", "phone");
  push("Origem", "origem");
  push("Sessão", "session");
  push("Data", "data");
  push("Total de mensagens", "total_mensagens");
  push("Perguntas do visitante", "perguntas_visitante");

  const message = asString(body.message);
  const transcript = asString(body.transcricao);
  if (message) {
    lines.push("", "Mensagem:", message);
  }
  if (transcript) {
    lines.push("", "Transcrição do chat:", transcript);
  }

  return lines.join("\n") || "(sem conteúdo)";
}

export async function sendLeadEmail(
  body: LeadBody,
  toEmail: string
): Promise<{ ok: true } | { ok: false; provider: string; message: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      provider: "resend",
      message:
        "Serviço de e-mail não configurado. Adicione RESEND_API_KEY nas variáveis de ambiente.",
    };
  }

  const subject = buildLeadSubject(
    asString(body._subject) || "Novo lead, Guia PCD",
    asString(body.name)
  );
  const replyTo = asString(body._replyto) || asString(body.email) || undefined;
  const plain = buildPlainText(body);
  const from =
    process.env.RESEND_FROM?.trim() || "Site Guia PcD <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [toEmail],
    subject,
    text: plain,
    replyTo: replyTo ? [replyTo] : undefined,
  });

  if (!error) return { ok: true };

  return {
    ok: false,
    provider: "resend",
    message: error.message || "Falha ao enviar o e-mail.",
  };
}
