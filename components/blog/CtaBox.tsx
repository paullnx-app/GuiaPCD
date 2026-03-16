import OpenLeadButton from "@/components/OpenLeadButton";

export default function CtaBox() {
  return (
    <div className="my-8 p-6 rounded-2xl border border-sky-500/40 bg-sky-900/40">
      <h4 className="text-lg font-bold text-white mb-2">
        Precisa de ajuda com sua isenção veicular?
      </h4>
      <p className="text-sky-100/90 text-sm mb-4">
        Nossa equipe pode orientar você em cada etapa do processo. Entre em contato.
      </p>
      <div className="flex flex-wrap gap-3">
        <OpenLeadButton
          source="blog-cta"
          as="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
        >
          Fale conosco
        </OpenLeadButton>
        <a
          href="https://api.whatsapp.com/send?phone=553132361498"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-800/60 px-6 py-2.5 text-sm font-semibold text-sky-50 transition hover:border-sky-300 hover:bg-sky-700/60"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
