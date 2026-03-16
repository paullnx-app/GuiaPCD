export default function Services() {
  const services = [
    {
      title: "Isenção de ICMS",
      description: "Isenção estadual aplicada sobre o valor do veículo zero km, garantindo uma economia significativa já na compra.",
    },
    {
      title: "Isenção de IPVA",
      description: "Redução de custos no dia a dia, com isenção do imposto anual sobre a propriedade do veículo.",
    },
    {
      title: "Isenção de IPI",
      description: "Benefício federal sobre veículos novos, diminuindo o valor total da nota fiscal na concessionária.",
    },
  ];

  return (
    <section id="servicos" className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
              Serviços especializados em isenção
            </p>
            <h2 className="text-balance text-2xl font-semibold text-white md:text-3xl">
              Tudo o que você precisa para conquistar a isenção veicular PCD.
            </h2>
            <p className="max-w-2xl text-sm text-sky-100/80 md:text-base">
              Atuamos de ponta a ponta: análise do seu direito, organização de documentos, protocolo
              e acompanhamento até a emissão da autorização. Você não precisa enfrentar a burocracia sozinho.
            </p>
          </div>
          <div className="rounded-2xl border border-sky-500/40 bg-sky-900/20 px-4 py-3 text-xs text-sky-100/90">
            <p className="font-semibold">Atendimento dedicado para cada tributo</p>
            <p>Planejamos a melhor estratégia combinando IPI, ICMS e IPVA para o seu caso.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-sky-800/80 bg-slate-900/60 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition hover:border-sky-300/80 hover:bg-slate-900"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-emerald-400/0 to-sky-300/5 opacity-0 transition group-hover:opacity-100" />
              <div className="relative space-y-3">
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-sky-100/85">{service.description}</p>
                <p className="pt-2 text-xs text-sky-300/80">
                  Acompanhamento em cada etapa, com atualização clara sobre prazos e documentos.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
