import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OpenLeadButton from "@/components/OpenLeadButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Sobre Nós - Guia PCD Despachante",
  description:
    "Conheça a história do Guia PCD Despachante e nossa jornada em isenção veicular para PCD em BH e Minas Gerais.",
};

export default function SobreNosPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Sobre Nós */}
      <section className="border-b border-sky-900/60 bg-gradient-to-br from-sky-950 via-slate-950 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_minmax(280px,0.9fr)] md:items-center md:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Sobre Nós
              </p>
              <h1 className="mt-3 text-balance text-2xl font-semibold text-white md:text-4xl">
                Gente como você, cuidando do que importa
              </h1>
              <p className="mt-4 max-w-xl text-sm text-sky-100/85 md:text-base">
                Somos uma equipe de BH que acredita que mobilidade é direito, não favor. Desde 2013,
                ajudamos pessoas com deficiência a conquistar a isenção veicular sem passar sozinhas
                por laudos, prazos e repartições. Aqui você é atendido por nome — não por número de processo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#servicos"
                  className="inline-flex items-center justify-center rounded-full border border-sky-500/50 bg-sky-900/30 px-5 py-2.5 text-sm font-semibold text-sky-100 transition hover:border-sky-400 hover:bg-sky-800/50"
                >
                  Nossos serviços
                </Link>
                <OpenLeadButton
                  source="sobre-nos"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md transition hover:bg-emerald-300"
                >
                  Falar com a gente
                </OpenLeadButton>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-sky-500/10 blur-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-sky-500/30 bg-slate-900/80 shadow-[0_24px_60px_rgba(15,23,42,0.8)] md:aspect-[3/4]">
                <Image
                  src="/images/sobre-nos-hero.jpg"
                  alt="Equipe Guia PCD Despachante em Belo Horizonte"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que nos move */}
      <section className="border-b border-sky-900/60 py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
            O que nos move
          </p>
          <h2 className="mt-3 text-center text-xl font-semibold text-white md:text-2xl">
            Valores que guiam nosso dia a dia
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Cada pessoa é uma história",
                text: "Não tratamos ninguém como mais um caso. Por trás de cada processo há uma vida, uma família e um sonho de mobilidade.",
              },
              {
                title: "Falar claro",
                text: "Nada de juridiquês ou surpresas. Explicamos cada etapa, cada documento e cada prazo de um jeito que você entende.",
              },
              {
                title: "Ir até o fim com você",
                text: "Não largamos no meio do caminho. Acompanhamos da primeira conversa até a autorização na mão — e além, se precisar.",
              },
              {
                title: "Respeitar seu tempo",
                text: "Sabemos que sua rotina já é cheia. Nosso trabalho é enxugar burocracia e manter você informado, sem encheção.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-sky-800/70 bg-slate-900/50 p-5 transition hover:border-sky-500/50"
              >
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-sky-100/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Palavra da equipe */}
      <section className="border-b border-sky-900/60 py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-slate-900/80 to-slate-950 p-6 md:p-8">
            <p className="text-base italic leading-relaxed text-emerald-50/95 md:text-lg">
              “Sabemos que lidar com laudos, prazos e repartições pode ser cansativo — e às vezes
              solitário. Nosso trabalho é caminhar junto com você, tirar dúvidas no meio do caminho
              e fazer o que prometemos: levar esse peso com você até a linha de chegada. Quando
              alguém nos agradece dizendo que finalmente conseguiu o carro ou a isenção, a gente
              lembra por que estamos aqui.”
            </p>
            <p className="mt-4 text-sm font-medium text-emerald-200/90">
              — Equipe Guia PCD Despachante
            </p>
          </div>
        </div>
      </section>

      <Timeline />
      <Footer />
    </main>
  );
}
