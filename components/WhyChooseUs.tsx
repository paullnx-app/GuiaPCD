import OpenLeadButton from "@/components/OpenLeadButton";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Consulta de documentos",
      description: "Avaliação médica",
      subDescription: "Obtenção de laudos",
    },
    {
      title: "Escolha do serviço desejado",
      description: "Acompanhamento do processo",
      subDescription: "Cumprimento de prazos",
    },
  ];

  const stats = [
    { number: "11+", label: "Anos de experiência", description: "Auxiliando a comunidade PCD com expertise e dedicação" },
    { number: "100%", label: "Satisfação do cliente", description: "Clientes satisfeitos com nossos serviços e compromisso" },
    { number: "1000+", label: "Casos de Sucesso", description: "Milhares de casos bem-sucedidos na obtenção de isenções" },
    { number: "24/7", label: "Suporte Contínuo", description: "Assistência e suporte disponíveis 24 horas por dia, 7 dias por semana" },
  ];

  const processItems = [
    "Consulta de documentos",
    "Avaliação médica",
    "Obtenção de laudos",
  ];

  const serviceItems = [
    "Escolha do serviço desejado",
    "Acompanhamento do processo",
    "Cumprimento de prazos",
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
              Por que o Guia PCD?
            </p>
            <h2 className="text-balance text-2xl font-semibold text-white md:text-3xl">
              Um time que entende a realidade de quem precisa de mobilidade com dignidade.
            </h2>
            <p className="text-sm text-sky-100/85 md:text-base">
              Mais do que despachar documentos, nós traduzimos a burocracia para uma linguagem simples,
              acompanhamos cada etapa e garantimos que você saiba exatamente o que está acontecendo no seu processo.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-sky-600/40 bg-sky-900/20 p-5">
                <p className="mb-2 text-xs font-semibold text-sky-300">Etapas iniciais</p>
                <ul className="space-y-2 text-sm text-sky-100/90">
                  {processItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-sky-600/40 bg-sky-900/20 p-5">
                <p className="mb-2 text-xs font-semibold text-sky-300">Acompanhamento</p>
                <ul className="space-y-2 text-sm text-sky-100/90">
                  {serviceItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-sky-500/40 bg-slate-900/60 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.9)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
              Nossos resultados
            </p>
            <p className="text-sm text-sky-100/90">
              Números que contam a história de quem já conquistou sua isenção veicular com o nosso apoio.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {stats.map((stat, index) => (
                <div key={index} className="rounded-2xl bg-slate-900/80 p-4">
                  <div className="text-2xl font-semibold text-white">{stat.number}</div>
                  <div className="text-xs font-semibold text-sky-300">{stat.label}</div>
                  <p className="mt-1 text-xs text-sky-100/80">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-sky-600/40 bg-gradient-to-r from-sky-900 via-sky-800 to-emerald-700 px-6 py-6 text-sm text-sky-50 md:flex md:items-center md:justify-between md:gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/80">
              Compromisso, experiência, eficiência
            </p>
            <p className="max-w-3xl text-sm text-sky-50">
              Somos a escolha de referência para isenção veicular PCD em Minas Gerais, com atendimento
              humano e foco em resultado real, não só em protocolo.
            </p>
          </div>
          <OpenLeadButton
            source="why-choose-us"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-md transition hover:bg-slate-100 md:mt-0"
          >
            Falar com um especialista
          </OpenLeadButton>
        </div>
      </div>
    </section>
  );
}
