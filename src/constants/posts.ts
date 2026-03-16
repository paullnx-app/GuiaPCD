import fs from "fs";
import path from "path";
import { parseMarkdown } from "@/lib/markdown";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/**
 * Lê os artigos do blog (content/blog/*.md) e retorna todo o texto concatenado
 * para uso como contexto no assistente virtual (siteContext).
 */
export function getPostsContext(): string {
  if (!fs.existsSync(BLOG_DIR)) return "";

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { frontmatter, content } = parseMarkdown(raw);
      return `## Artigo: ${frontmatter.title}\nCategoria: ${frontmatter.category}\nResumo: ${frontmatter.excerpt}\n\n${content}`;
    })
    .join("\n\n---\n\n");
}
