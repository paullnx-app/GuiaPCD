/**
 * STANDBY — Agendamento via Calendly desativado no produto (chat usa só WhatsApp).
 * Código mantido para reativar no futuro: botão [CTA_CALENDLY] no ChatWindow + fetch /api/calendly-url.
 *
 * URL pública de agendamento. NEXT_PUBLIC_* no cliente; CALENDLY_URL opcional no servidor.
 */
export function getCalendlySchedulingUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
    process.env.CALENDLY_URL?.trim() ||
    ""
  );
}
