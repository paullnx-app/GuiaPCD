"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type LeadSource =
  | "hero"
  | "why-choose-us"
  | "process-steps"
  | "benefits"
  | "header"
  | "footer"
  | "contact"
  | "sobre-nos"
  | "blog-cta";

type LeadModalContextValue = {
  isOpen: boolean;
  source: LeadSource | "";
  openLeadModal: (source?: LeadSource) => void;
  closeLeadModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<LeadSource | "">("");

  const openLeadModal = useCallback((s?: LeadSource) => {
    setSource(s ?? "");
    setIsOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setIsOpen(false);
    setSource("");
  }, []);

  return (
    <LeadModalContext.Provider
      value={{ isOpen, source, openLeadModal, closeLeadModal }}
    >
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadModalProvider");
  }
  return ctx;
}
