export default function Testimonials() {
  const values = [
    {
      title: "Simplicidade",
      description: "Traduzimos a linguagem jurídica e burocrática para o dia a dia, em uma conversa clara e direta.",
    },
    {
      title: "Parceria",
      description: "Caminhamos junto com você, não apenas como prestadores de serviço, mas como aliados na conquista da isenção.",
    },
    {
      title: "Descomplicação",
      description: "Organizamos as etapas, prazos e documentos para que o processo fique mais leve e previsível.",
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
          <p className="mt-3 max-w-3xl mx-auto text-sm text-sky-100/85 md:text-base">
            Cada processo concluído é uma história de mobilidade, autonomia e dignidade recuperada. Veja
            como esse trabalho impacta, na prática, a vida de quem passa por aqui.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-4xl">
          <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 via-slate-900 to-slate-950 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.9)]">
            <blockquote className="mb-4 text-lg text-emerald-50/95 italic md:text-xl">
              “O Guia PCD Despachante fez toda a diferença na minha busca por isenções fiscais. Eu não
              fazia ideia por onde começar e, com a ajuda deles, consegui organizar documentos, cumprir
              prazos e acompanhar tudo pelo WhatsApp. Hoje, tenho meu carro adaptado e pagando muito menos
              imposto.”
            </blockquote>
            <p className="text-sm font-semibold text-emerald-100 md:text-base">— Cliente Guia PCD</p>
          </div>
        </div>

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
