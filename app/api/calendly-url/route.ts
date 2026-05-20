/**
 * STANDBY — Rota não usada pelo chat (agendamento = WhatsApp). Mantida para reativar Calendly depois.
 */
import { getCalendlySchedulingUrl } from "@/src/lib/calendly";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = getCalendlySchedulingUrl();
  return NextResponse.json({ url: url.length > 0 ? url : null });
}
