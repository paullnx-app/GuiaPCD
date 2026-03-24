import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  // Garante chat-rules.md e posts do blog no bundle serverless (Vercel) — sem isso o fs falha em produção
  outputFileTracingIncludes: {
    "/api/chat": ["./chat-rules.md", "./content/blog/**/*.md"],
    "app/api/chat/route": ["./chat-rules.md", "./content/blog/**/*.md"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
