"use client";

import { useLeadModal } from "@/contexts/LeadModalContext";
import type { LeadSource } from "@/contexts/LeadModalContext";

type OpenLeadButtonProps = {
  source?: LeadSource;
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
};

export default function OpenLeadButton({
  source,
  children,
  className,
  as = "button",
}: OpenLeadButtonProps) {
  const { openLeadModal } = useLeadModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openLeadModal(source);
  };

  if (as === "a") {
    return (
      <a href="#lead" onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
