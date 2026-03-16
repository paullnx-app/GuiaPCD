import OpenLeadButton from "@/components/OpenLeadButton";

export default function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Laudo médico",
      description:
        "Você envia os laudos médicos que comprovam sua condição. Nós analisamos se atendem aos critérios para isenção e te orientamos sobre eventuais complementos.",
      hint: "Base de tudo",
    },
    {
      number: "02",
      title: "Análise do especialista",
      description:
        "Nossa equipe especializada avalia seu caso e define exatamente quais tributos você tem direito a isentar (IPI, ICMS, IPVA) e o que precisamos protocolar.",
      hint: "Diagnóstico do seu direito",
    },
    {
      number: "03",
      title: "Documentação",
      description:
        "Organizamos com você a documentação exigida por cada órgão: Receita Federal, Secretaria da Fazenda e DETRAN. Nada de surpresas em cima da hora.",
      hint: "Tudo em ordem",
    },
    {
      number: "04",
      title: "Obtenção das isenções",
      description:
        "Acompanhamos todo o trâmite até a concessão. Quando sair a autorização, você já sabe o próximo passo: comprar ou emplacar seu veículo com os benefícios garantidos.",
      hint: "Do diagnóstico ao volante",
    },
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
            Como funciona
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-white md:text-3xl">
            Do diagnóstico ao volante em 4 passos simples
          </h2>
          <p className="mt-3 text-sm text-sky-100/85 md:text-base">
            Do primeiro contato até a conquista da isenção, você tem uma rota clara: laudo, análise,
            documentação e resultado. Sem atalhos confusos nem burocracia escondida.
          </p>
        </div>

        <div className="relative">
          {/* Linha de conexão (desktop) */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-sky-600/60 via-emerald-500/50 to-sky-600/60 md:block"
            aria-hidden
          />

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col">
                {/* Número e bolinha na linha */}
                <div className="mb-5 flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-sky-500/60 bg-slate-900 text-sm font-bold text-sky-200 shadow-[0_0_0_4px_rgba(15,23,42,1)]">
                    {step.number}
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-sky-300/90 md:mt-0">
                    {step.hint}
                  </span>
                </div>

                <div className="flex flex-1 flex-col rounded-2xl border border-sky-800/80 bg-slate-900/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition hover:border-sky-400/50">
                  <h3 className="text-base font-semibold text-white md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-sky-100/85 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-slate-900/80 to-sky-900/30 px-6 py-5 text-center">
          <p className="text-sm text-sky-50/95 md:text-base">
            O Guia PCD está comprometido em simplificar cada uma dessas etapas para você. Do primeiro
            laudo à autorização na mão, nossa equipe acompanha e explica cada passo.
          </p>
          <OpenLeadButton
            source="process-steps"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-md transition hover:bg-emerald-300"
          >
            Quero começar pelo passo 1
          </OpenLeadButton>
        </div>
      </div>
    </section>
  );
}
