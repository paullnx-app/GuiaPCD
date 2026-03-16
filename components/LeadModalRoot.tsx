"use client";

import { LeadModalProvider } from "@/contexts/LeadModalContext";
import LeadFormModal from "@/components/LeadFormModal";

export default function LeadModalRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LeadModalProvider>
      {children}
      <LeadFormModal />
    </LeadModalProvider>
  );
}
