"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SESSION_ID_KEY = "guiapcd_chat_session_id";
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=553132361498&text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20isen%C3%A7%C3%A3o%20veicular%20PcD.";
const CTA_TAG = "[CTA_WHATSAPP]";
const MIN_MESSAGES_TO_REPORT = 5;

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

function CtaWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-95"
      style={{
        background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
        boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
      }}
    >
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      Falar com especialista no WhatsApp
    </a>
  );
}

function AssistantMessage({ content }: { content: string }) {
  const hasCta = content.includes(CTA_TAG);
  const cleanContent = content.replace(CTA_TAG, "").trim();

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-700 px-1 py-0.5 text-xs text-sky-200">
              {children}
            </code>
          ),
        }}
      >
        {cleanContent}
      </ReactMarkdown>
      {hasCta && <CtaWhatsApp />}
    </>
  );
}

type Message = { id: string; role: "user" | "assistant"; content: string };

let _id = 0;
function genId() {
  return `msg-${++_id}-${Date.now()}`;
}

export default function ChatWindow() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const summarySentRef = useRef(false);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Fecha ao rolar a página ou clicar fora do chat
  useEffect(() => {
    if (!open) return;

    let lastY = window.scrollY;

    function onScroll() {
      const delta = Math.abs(window.scrollY - lastY);
      if (delta > 80) {
        handleClose();
      }
      lastY = window.scrollY;
    }

    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const insidePanel = panelRef.current?.contains(target);
      const insideButton = buttonRef.current?.contains(target);
      if (!insidePanel && !insideButton) {
        handleClose();
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function sendSummary(msgs: Message[], sid: string) {
    if (summarySentRef.current) return;
    if (msgs.length < MIN_MESSAGES_TO_REPORT) return;
    summarySentRef.current = true;
    try {
      await fetch("/api/chat-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: msgs.map((m) => ({ role: m.role, content: m.content })),
          sessionId: sid,
        }),
      });
    } catch {
      // silently fail — não interrompe a UX
    }
  }

  function handleClose() {
    sendSummary(messages, sessionId);
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    setError(null);

    const userMsg: Message = { id: genId(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId || getOrCreateSessionId(),
          history: newMessages.slice(0, -1).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));
      const content =
        typeof data?.content === "string"
          ? data.content
          : data?.error ||
            "Não foi possível obter uma resposta. Tente novamente ou fale conosco pelo WhatsApp (31) 3236-1498.";

      setMessages((prev) => [
        ...prev,
        { id: genId(), role: "assistant", content },
      ]);
    } catch {
      setError(
        "Erro de conexão. Tente novamente ou fale conosco pelo WhatsApp (31) 3236-1498."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-20 right-4 z-[9999] w-[400px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl shadow-2xl sm:right-6"
            style={{
              background: "linear-gradient(180deg, #0f172a 0%, #0c1528 100%)",
              border: "1px solid rgba(56,189,248,0.15)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(52,211,153,0.08)",
            }}
          >
            <div className="flex flex-col">
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3.5"
                style={{
                  background: "linear-gradient(90deg, rgba(16,185,129,0.12) 0%, rgba(14,165,233,0.08) 100%)",
                  borderBottom: "1px solid rgba(56,189,248,0.12)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/30">
                      L
                    </span>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Lia — Assistente Guia PCD
                    </p>
                    <p className="text-[11px] text-emerald-400/80 font-medium">
                      ● Online agora
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleClose()}
                  className="rounded-lg p-1.5 text-sky-400/60 transition hover:bg-white/5 hover:text-white"
                  aria-label="Fechar chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages area */}
              <div
                ref={scrollRef}
                className="flex max-h-[380px] min-h-[260px] flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(56,189,248,0.2) transparent" }}
              >
                {messages.length === 0 && !error && (
                  <div
                    className="rounded-xl p-4 text-sm"
                    style={{
                      background: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(14,165,233,0.06) 100%)",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-xs font-bold text-emerald-400">
                        L
                      </span>
                      <div className="space-y-1.5">
                        <p className="font-semibold text-white">Olá! Sou a Lia 👋</p>
                        <p className="text-sky-100/80 leading-relaxed">
                          Estou aqui para tirar suas dúvidas sobre <strong className="text-white">isenção veicular para PcD</strong> — documentação, laudos, impostos e nossos serviços.
                        </p>
                        <p className="text-sky-300/60 text-xs pt-1">Como posso te ajudar hoje?</p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-200">
                    <p>{error}</p>
                    <button
                      type="button"
                      onClick={() => setError(null)}
                      className="mt-2 text-xs underline hover:no-underline"
                    >
                      Fechar
                    </button>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-[10px] font-bold text-emerald-400">
                        L
                      </span>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-sm text-white"
                          : "rounded-bl-sm text-sky-100/90"
                      }`}
                      style={
                        msg.role === "user"
                          ? {
                              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                              boxShadow: "0 2px 12px rgba(16,185,129,0.25)",
                            }
                          : {
                              background: "rgba(30,41,59,0.9)",
                              border: "1px solid rgba(56,189,248,0.1)",
                            }
                      }
                    >
                      {msg.role === "user" ? (
                        <span className="whitespace-pre-wrap">{msg.content}</span>
                      ) : (
                        <AssistantMessage content={msg.content} />
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-[10px] font-bold text-emerald-400">
                      L
                    </span>
                    <div
                      className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3"
                      style={{
                        background: "rgba(30,41,59,0.9)",
                        border: "1px solid rgba(56,189,248,0.1)",
                      }}
                    >
                      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div
                className="px-3 py-3"
                style={{ borderTop: "1px solid rgba(56,189,248,0.1)", background: "rgba(15,23,42,0.8)" }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 rounded-xl p-1"
                  style={{
                    background: "rgba(30,41,59,0.8)",
                    border: "1px solid rgba(56,189,248,0.15)",
                  }}
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua dúvida..."
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-sky-400/40 focus:outline-none"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400 text-slate-950 transition hover:bg-emerald-300 disabled:opacity-40"
                    aria-label="Enviar mensagem"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
                <p className="mt-2 text-center text-[10px] text-sky-400/30">
                  Respostas baseadas no conteúdo do site Guia PCD
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (open) handleClose();
          else setOpen(true);
        }}
        className="fixed bottom-4 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full sm:right-6"
        style={{
          background: open
            ? "rgba(30,41,59,0.95)"
            : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow: open
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(16,185,129,0.4), 0 0 0 4px rgba(16,185,129,0.1)",
          border: open ? "1px solid rgba(56,189,248,0.2)" : "none",
        }}
        aria-label={open ? "Fechar chat" : "Abrir chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6 text-sky-300" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
