import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";
export const runtime = "nodejs";

/** Bots de busca e de IA com acesso às páginas públicas (APIs ficam bloqueadas). */
const CRAWLER_AGENTS = [
  "*",
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Amazonbot",
  "cohere-ai",
  "Bytespider",
  "CCBot",
  "meta-externalagent",
  "FacebookBot",
  "YouBot",
  "Diffbot",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: CRAWLER_AGENTS.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/api/"],
    })),
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
