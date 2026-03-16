"use client";

import { useState, useEffect, useRef } from "react";
import { useLeadModal } from "@/contexts/LeadModalContext";
import {
  validateName,
  validateEmail,
  validatePhoneBR,
  validateMessage,
  formatPhoneBR,
} from "@/lib/leadFormValidation";

const WHATSAPP_PHONE = "553132361498";

function buildWhatsAppUrl(name: string): string {
  const text = encodeURIComponent(
    `Olá, preenchi o formulário no site (Guia PCD). Meu nome é ${name}. Gostaria de informações sobre isenção veicular.`
  );
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;
}

export default function LeadFormModal() {
  const { isOpen, source, closeLeadModal } = useLeadModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(6);
  const redirectDone = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const nameError = validateName(name);
    if (nameError) {
      setErrorMessage(nameError);
      return;
    }
    const phoneError = validatePhoneBR(phone);
    if (phoneError) {
      setErrorMessage(phoneError);
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }
    const messageError = validateMessage(message);
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
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          _subject: "Novo lead – Guia PCD",
          _replyto: email.trim(),
          _captcha: false,
          origem: source || "Site",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Não foi possível enviar. Tente de novo.");
        return;
      }

      setStatus("success");
      setCountdown(6);
      redirectDone.current = false;
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
    }
  };

  useEffect(() => {
    if (status !== "success" || redirectDone.current) return;
    if (countdown <= 0) {
      redirectDone.current = true;
      window.open(buildWhatsAppUrl(name), "_blank", "noopener,noreferrer");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown, name]);

  const handleClose = () => {
    setStatus("idle");
    setCountdown(6);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setErrorMessage("");
    closeLeadModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-sky-700/60 bg-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.9)]">
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 id="lead-modal-title" className="text-xl font-semibold text-white">
              Fale conosco
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-2 text-sky-200 hover:bg-sky-800/60 hover:text-white"
              aria-label="Fechar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === "success" ? (
            <div className="space-y-4 text-center">
              <p className="text-sky-100">
                Obrigado! Recebemos seus dados. Você será redirecionado automaticamente para o WhatsApp em{" "}
                <strong>{countdown} segundos</strong>.
              </p>
              <a
                href={buildWhatsAppUrl(name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Abrir WhatsApp agora
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="text-sm text-sky-300 underline hover:text-white"
              >
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="mb-1 block text-sm font-medium text-sky-200">
                  Nome
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Seu nome"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className="mb-1 block text-sm font-medium text-sky-200">
                  Telefone
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                  className="w-full rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="(31) 99999-9999"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="lead-email" className="mb-1 block text-sm font-medium text-sky-200">
                  E-mail
                </label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Ex.: nome@email.com"
                  className="w-full rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="seu@email.com"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="lead-message" className="mb-1 block text-sm font-medium text-sky-200">
                  Conte sua necessidade
                </label>
                <textarea
                  id="lead-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-xl border border-sky-700/60 bg-slate-800 px-4 py-3 text-white placeholder-sky-400/60 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ex.: quero isentar IPVA e ICMS para um veículo zero km..."
                  disabled={status === "loading"}
                />
              </div>
              {errorMessage && (
                <p className="text-sm text-red-400">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
              >
                {status === "loading" ? "Enviando…" : "Enviar e falar no WhatsApp"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
