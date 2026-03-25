/**
 * URL pública de agendamento (Calendly). NEXT_PUBLIC_* no cliente; CALENDLY_URL opcional no servidor
 * quando o deploy define só variável de runtime (evita bundle desatualizado sem o botão).
 */
export function getCalendlySchedulingUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
    process.env.CALENDLY_URL?.trim() ||
    ""
  );
}
