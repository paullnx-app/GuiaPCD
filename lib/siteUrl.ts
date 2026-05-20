const DEFAULT_SITE_URL = "https://www.guiapcd.com.br";

/** URL canônica do site (sem barra final). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}
