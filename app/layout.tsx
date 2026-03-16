import type { Metadata } from "next";
import "./globals.css";
import LeadModalRoot from "@/components/LeadModalRoot";
import ChatWindow from "@/components/ChatWindow";

export const metadata: Metadata = {
  title: "Despachante PCD - Guia PCD",
  description: "Despachante PCD em BH para isenção veicular",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <LeadModalRoot>{children}</LeadModalRoot>
        <ChatWindow />
      </body>
    </html>
  );
}
