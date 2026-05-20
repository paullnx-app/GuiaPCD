const VISITOR_STORAGE_KEY = "guiapcd_chat_visitor";

export type ChatVisitor = {
  name: string;
  email: string;
};

export function loadChatVisitor(): ChatVisitor | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(VISITOR_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as ChatVisitor;
    const name = data.name?.trim();
    const email = data.email?.trim();
    if (!name || !email) return null;
    return { name, email };
  } catch {
    return null;
  }
}

export function saveChatVisitor(visitor: ChatVisitor): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    VISITOR_STORAGE_KEY,
    JSON.stringify({ name: visitor.name.trim(), email: visitor.email.trim() })
  );
}
