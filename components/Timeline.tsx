export default function Timeline() {
  const milestones = [
    {
      year: "2013",
      title: "O começo",
      description:
        "Abrimos as portas em BH com um propósito simples: ajudar pessoas com deficiência a conseguir a isenção veicular sem se perder na burocracia. Cada cliente que chegava nos mostrava que estávamos no caminho certo.",
    },
    {
      year: "2017",
      title: "Nos adaptando para servir melhor",
      description:
        "As regras da Receita e do Estado mudaram — e a gente se atualizou. Ajustamos nossos processos para que você continuasse sendo atendido com clareza e sem atrasos, mesmo com as mudanças.",
    },
    {
      year: "2019",
      title: "Crescendo pela confiança de quem nos indicou",
      description:
        "Passamos a ser lembrados não só em BH, mas em várias cidades de Minas. Muita gente nos encontrou por indicação de quem já tinha passado por aqui. Isso nos motivou a manter o mesmo cuidado de sempre.",
    },
    {
      year: "2024",
      title: "Hoje: o mesmo compromisso, mais experiência",
      description:
        "Seguimos especialistas em isenção veicular em todo MG. O que mudou foi a experiência acumulada; o que não mudou é a vontade de tratar cada pessoa com respeito e transparência, do primeiro contato ao resultado.",
    },
  ];

  return (
    <section id="sobre" className="bg-slate-950 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
            Nossa história
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-white md:text-3xl">
            Nossa jornada para alcançar a excelência em isenção veicular
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-sky-100/85 md:text-base">
            Alguns marcos da nossa trajetória — e das pessoas que confiaram na gente ao longo do caminho.
          </p>
        </div>

        <div className="relative">
          {/* Linha vertical central (timeline) */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/60 via-emerald-500/50 to-sky-500/60 md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <ul className="space-y-10 md:space-y-12">
            {milestones.map((milestone, index) => (
              <li key={index} className="relative flex gap-6 md:gap-10 md:odd:flex-row-reverse">
                {/* Bolinha na linha */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-sky-500/70 bg-slate-900 text-xs font-bold text-sky-200 shadow-[0_0_0_4px_rgba(15,23,42,1)] md:mx-auto md:h-12 md:w-12 md:text-sm">
                  {milestone.year}
                </div>

                {/* Card */}
                <div className="min-w-0 flex-1 pb-2 md:w-[calc(50%-2.5rem)]">
                  <div className="rounded-2xl border border-sky-800/80 bg-slate-900/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition hover:border-sky-400/50 md:p-6">
                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm text-sky-100/85 leading-relaxed md:text-base">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Espaço vazio no lado alternado (desktop) para layout zigzag */}
                <div className="hidden shrink-0 md:block md:w-[calc(50%-2.5rem)]" />
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Contato */}
        <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 via-slate-900/90 to-sky-900/30 px-6 py-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-200/90">
            Preferimos conversar?
          </p>
          <p className="mt-1 text-base text-sky-50/95">
            Liga ou manda mensagem — a gente responde. Dúvidas sobre isenção ou sobre nós, estamos aqui.
          </p>
          <a
            href="tel:3132361498"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-md transition hover:bg-emerald-300"
          >
            (31) 3236-1498
          </a>
        </div>
      </div>
    </section>
  );
}
