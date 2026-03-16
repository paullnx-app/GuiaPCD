"use client";

import { useState } from "react";
import OpenLeadButton from "@/components/OpenLeadButton";
import {
  validateName,
  validateEmail,
  validatePhoneBR,
  validateMessage,
  formatPhoneBR,
} from "@/lib/leadFormValidation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const nameError = validateName(formData.name);
    if (nameError) {
      setErrorMessage(nameError);
      return;
    }
    const phoneError = validatePhoneBR(formData.phone);
    if (phoneError) {
      setErrorMessage(phoneError);
      return;
    }
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }
    const messageError = validateMessage(formData.message);
    if (messageError) {
      setErrorMessage(messageError);
      return;
    }

    setStatus("loading");

    const leadEmail = process.env.NEXT_PUBLIC_LEAD_EMAIL?.trim();
    if (!leadEmail) {
      setStatus("error");
      setErrorMessage("E-mail de contato não configurado.");
      return;
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(leadEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          _subject: "Novo lead – Guia PCD (Contato)",
          _replyto: formData.email.trim(),
          _captcha: false,
          origem: "Formulário da página Contato",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Não foi possível enviar. Tente de novo.");
        return;
      }
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <section id="contato" className="py-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
            Contato
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-white md:text-3xl">
            Estamos aqui para te atender.
          </h2>
          <p className="mt-3 text-sm text-sky-100/90 md:text-base">
            Seja para esclarecer dúvidas, iniciar seu processo de isenção veicular ou simplesmente para nos conhecer melhor, estamos prontos para ouvir você. Utilize os detalhes abaixo ou preencha o formulário e entraremos em contato em breve.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Informações de Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-sky-700/60 bg-slate-900/70 p-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-sky-100/90">
                  Av. Contorno, 2905 – Sl. 405 – Santa Efigênia, Belo Horizonte / MG – 30110-915
                </p>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-sky-700/60 bg-slate-900/70 p-4">
                <svg className="h-5 w-5 shrink-0 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:[email protected]" className="text-sm text-sky-100/90 hover:text-emerald-400 transition">[email protected]</a>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-sky-700/60 bg-slate-900/70 p-4">
                <svg className="h-5 w-5 shrink-0 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:3132361498" className="text-sm text-sky-100/90 hover:text-emerald-400 transition">(31) 3236-1498</a>
              </div>
            </div>
            <OpenLeadButton
              source="contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Fale Conosco
            </OpenLeadButton>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-sky-700/60 bg-slate-900/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.9)] md:p-8">
            <h3 className="mb-6 text-lg font-semibold text-white">Fale Conosco</h3>
            {status === "success" ? (
              <div className="space-y-4 rounded-2xl border border-emerald-500/40 bg-emerald-900/20 p-6 text-emerald-50">
                <p className="font-semibold">Mensagem enviada com sucesso.</p>
                <p className="text-sm text-emerald-50/90">
                  Recebemos seus dados e entraremos em contato em breve. Você também pode falar conosco pelo WhatsApp.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=553132361498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Abrir WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-sky-100/90">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-sky-100/90">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Ex.: nome@email.com"
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-sky-100/90">
                    Telefone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="(31) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneBR(e.target.value) })}
                    className="w-full rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-sky-100/90">
                    Conte sua necessidade
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    placeholder="Ex.: quero isentar IPVA e ICMS para um veículo zero km..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full resize-y rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    disabled={status === "loading"}
                  />
                </div>
                {errorMessage && (
                  <p className="text-sm text-red-400">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:opacity-60"
                >
                  {status === "loading" ? "Enviando…" : "Enviar Mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
