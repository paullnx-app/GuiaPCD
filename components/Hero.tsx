import Image from "next/image";
import OpenLeadButton from "@/components/OpenLeadButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="relative mx-auto max-w-6xl px-4 pt-[50px] pb-16 md:pt-[82px] md:pb-24">
        <div className="grid min-h-[28rem] gap-0 md:grid-cols-[1fr_1.15fr] md:items-stretch">
          <div className="relative order-1 flex flex-col justify-center space-y-6 py-12 md:py-16 md:pr-10">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/40 bg-sky-900/40 px-3 py-1 text-xs font-medium text-sky-100 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Guia PCD · Despachante especialista em PcD, Belo Horizonte</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                <span className="text-white">Despachante PcD em BH para </span>
                <span className="text-emerald-400">isenção de imposto veicular</span>
              </h1>
              <p className="max-w-xl text-base text-sky-100/90 md:text-lg">
                Cuidamos de todo o processo de isenção de IPI, ICMS e IPVA para pessoas com
                deficiência em Belo Horizonte e região. Você foca na sua mobilidade, nós cuidamos da
                parte chata.
              </p>
            </div>

            <div>
              <OpenLeadButton
                source="hero"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar no WhatsApp
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

          <div className="relative order-2 min-h-[20rem] w-full md:min-h-[32rem] md:pl-4">
            <div className="relative h-full min-h-[20rem] w-full overflow-hidden rounded-xl md:min-h-[32rem]">
              <Image
                src="/images/hero-pessoa.webp"
                alt="Despachante PCD Guia PCD: atendimento para isenção veicular em Belo Horizonte"
                fill
                className="object-cover object-center brightness-[1.25] contrast-105"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
              />
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
