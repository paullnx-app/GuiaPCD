import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/sendLeadEmail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const leadEmail = process.env.NEXT_PUBLIC_LEAD_EMAIL?.trim();
  if (!leadEmail) {
    return NextResponse.json(
      { error: "email_not_configured", message: "E-mail de contato não configurado." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  try {
    const result = await sendLeadEmail(body, leadEmail);

    if (!result.ok) {
      return NextResponse.json(
        {
          error: "send_failed",
          provider: result.provider,
          message: result.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error: "network_error",
        message: "Falha ao contactar o serviço de envio. Tente de novo em instantes.",
      },
      { status: 502 }
    );
  }
}
