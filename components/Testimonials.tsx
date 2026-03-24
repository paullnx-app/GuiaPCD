import { getShuffledReviewsForDisplay, getGoogleMapsReviewUrl } from "@/lib/googleReviews";

function Stars({ rating }: { rating: number }) {
  const n = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${n} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < n ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default async function Testimonials() {
  const reviews = await getShuffledReviewsForDisplay(3);
  const mapsUrl = getGoogleMapsReviewUrl();

  const values = [
    {
      title: "Simplicidade",
      description:
        "Traduzimos a linguagem jurídica e burocrática para o dia a dia, em uma conversa clara e direta.",
    },
    {
      title: "Parceria",
      description:
        "Caminhamos junto com você, não apenas como prestadores de serviço, mas como aliados na conquista da isenção.",
    },
    {
      title: "Descomplicação",
      description:
        "Organizamos as etapas, prazos e documentos para que o processo fique mais leve e previsível.",
    },
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Histórias de quem já conquistou a isenção
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-white md:text-3xl">
            Nossa missão é tornar a sua jornada menos cansativa e mais possível.
          </h2>
          <p className="mt-3 mx-auto max-w-3xl text-sm text-sky-100/85 md:text-base">
            Cada processo concluído é uma história de mobilidade, autonomia e dignidade recuperada. A
            seleção abaixo é exibida em ordem aleatória a cada visita.
          </p>
        </div>

        <div className="mx-auto mb-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, index) => (
            <div
              key={`${r.author}-${index}-${r.text.slice(0, 24)}`}
              className="flex flex-col rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/10 via-slate-900/90 to-slate-950 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.85)]"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-emerald-50/95 md:text-base">
                “{r.text}”
              </blockquote>
              <div className="mt-4 border-t border-sky-800/40 pt-3">
                <p className="text-sm font-semibold text-white">— {r.author}</p>
                {r.relativeTime ? (
                  <p className="text-xs text-sky-400/70">{r.relativeTime}</p>
                ) : null}
                {r.source === "google" ? (
                  <p className="mt-1 text-[10px] text-sky-500/50">Avaliação no Google</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {mapsUrl ? (
          <p className="mb-10 text-center text-xs text-sky-400/60">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-sky-600/50 underline-offset-2 hover:text-sky-300"
            >
              Ver perfil e avaliações no Google
            </a>
          </p>
        ) : null}

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-2xl border border-sky-700/60 bg-slate-900/70 p-5 text-center shadow-[0_16px_40px_rgba(15,23,42,0.9)]"
            >
              <h3 className="text-base font-semibold text-white md:text-lg">{value.title}</h3>
              <p className="mt-2 text-xs text-sky-100/85 md:text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
