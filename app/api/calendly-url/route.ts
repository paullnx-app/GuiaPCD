import { getCalendlySchedulingUrl } from "@/src/lib/calendly";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = getCalendlySchedulingUrl();
  return NextResponse.json({ url: url.length > 0 ? url : null });
}
