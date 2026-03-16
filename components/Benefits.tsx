import OpenLeadButton from "@/components/OpenLeadButton";

export default function Benefits() {
  const benefits = [
    {
      title: "Agilidade e Eficiência",
      description:
        "Priorizamos prazos e comunicação clara. Você sabe exatamente em que etapa o seu processo está, sem surpresas.",
    },
    {
      title: "Expertise Especializada",
      description:
        "Conhecemos as particularidades da legislação PCD e das secretarias estaduais, o que reduz riscos de indeferimento.",
    },
    {
      title: "Suporte Abrangente",
      description:
        "Nossa equipe acompanha da primeira dúvida até a emissão da autorização, sempre disponível para orientar o próximo passo.",
    },
    {
      title: "Transparência Total",
      description:
        "Informações claras sobre documentos, prazos e custos, para que você tenha previsibilidade em todas as etapas.",
    },
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Benefícios de ter o Guia PCD ao seu lado
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-white md:text-3xl">
            Muito além de dar entrada na papelada: uma jornada assistida de verdade.
          </h2>
          <p className="mt-3 text-sm text-sky-100/90 md:text-base">
            Quando você escolhe o Guia PCD, não está só contratando um serviço. Está garantindo que cada
            detalhe do processo de isenção seja cuidado por quem entende do assunto e respeita o seu tempo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] md:items-start">
          <div className="grid gap-5 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-2xl border border-sky-700/60 bg-slate-900/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
              >
                <h3 className="text-sm font-semibold text-white md:text-base">{benefit.title}</h3>
                <p className="mt-2 text-xs text-sky-100/85 md:text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 via-slate-900 to-slate-950 p-6 text-sm text-emerald-50 md:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
              Na prática, o que isso significa?
            </p>
            <p className="text-sm text-emerald-50/95">
              Menos tempo lidando com burocracia, menos estresse com prazos e mais segurança em cada decisão
              durante o processo de isenção. Você não precisa descobrir tudo sozinho.
            </p>
            <ul className="space-y-2 text-xs text-emerald-50/90 md:text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Acompanhamento próximo via WhatsApp e canais digitais.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Explicação simples de cada documento solicitado e motivo.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Alertas sobre prazos para que nada fique para trás.
              </li>
            </ul>
            <OpenLeadButton
              source="benefits"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-md transition hover:bg-slate-100"
            >
              Quero aproveitar esses benefícios
            </OpenLeadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
