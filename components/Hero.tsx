import Image from "next/image";
import OpenLeadButton from "@/components/OpenLeadButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="relative mx-auto max-w-6xl px-4 pt-[50px] pb-16 md:pt-[82px] md:pb-24">
        <div className="grid min-h-[28rem] gap-0 md:grid-cols-[1fr_1.15fr] md:items-stretch">
          {/* Coluna esquerda: texto e CTA */}
          <div className="relative order-1 flex flex-col justify-center space-y-6 py-12 md:py-16 md:pr-10">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/40 bg-sky-900/40 px-3 py-1 text-xs font-medium text-sky-100 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Especialistas em isenção veicular para PCD em BH</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                <span className="text-white">Guia PCD: </span>
                <span className="text-emerald-400">isenção veicular</span>
                <span className="text-white"> sem burocracia para quem mais precisa.</span>
              </h1>
              <p className="max-w-xl text-base text-sky-100/90 md:text-lg">
                Cuidamos de todo o processo de isenção de IPI, ICMS e IPVA para pessoas com deficiência
                em Belo Horizonte e região. Você foca na sua mobilidade, nós cuidamos da parte chata.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <OpenLeadButton
                source="hero"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                Quero começar minha isenção
                <span className="text-slate-950" aria-hidden>→</span>
              </OpenLeadButton>
              <OpenLeadButton
                source="hero"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-sky-500/40 bg-sky-900/40 px-8 py-3 text-sm font-semibold text-sky-50 transition hover:border-sky-300 hover:bg-sky-800/60"
              >
                Falar no WhatsApp agora
              </OpenLeadButton>
            </div>

            <div className="grid gap-4 border-t border-sky-800/60 pt-6 text-xs text-sky-100/70 sm:grid-cols-3">
              <div>
                <div className="text-lg font-semibold text-white">+500</div>
                <div>processos de isenção concluídos com sucesso</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Economia média</div>
                <div>de até dezenas de milhares de reais em impostos</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Atendimento humano</div>
                <div>acompanhamento próximo em cada etapa do processo</div>
              </div>
            </div>
          </div>

          {/* Coluna direita: imagem com degradê e destaque */}
          <div className="relative order-2 min-h-[20rem] w-full md:min-h-[32rem] md:pl-4">
            <div className="relative h-full min-h-[20rem] w-full overflow-hidden rounded-xl md:min-h-[32rem]">
              <Image
                src="/images/hero-pessoa.webp"
                alt="Atendimento humanizado para isenção veicular PCD em BH"
                fill
                className="object-cover object-center brightness-[1.25] contrast-105"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
              />
              {/* Degradê horizontal: fundo sólido à esquerda → imagem visível à direita */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
