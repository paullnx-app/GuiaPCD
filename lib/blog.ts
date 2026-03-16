import fs from "fs";
import path from "path";
import { parseMarkdown } from "./markdown";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}

export const authors: Record<string, Author> = {
  carmen: {
    id: "carmen",
    name: "Carmen Rena",
    role: "Especialista em isenção veicular PCD",
    bio: "Carmen Rena é especialista com mais de 10 anos de experiência em processos de isenção veicular para pessoas com deficiência (PCD). Dedica sua carreira a orientar e facilitar o acesso a direitos garantidos por lei, ajudando condutores e não condutores a navegar com segurança por cada etapa do processo. É fundadora do site Guia PCD, uma referência em informações e soluções práticas para quem busca isenções de impostos na compra de veículos.",
  },
  paul: {
    id: "paul",
    name: "Paul Leite",
    role: "Colaborador Guia PCD",
    bio: "Colaborador do Guia PCD, contribuindo com conteúdo sobre inclusão e acessibilidade.",
  },
};

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPostImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorData: Author;
  category: string;
  excerpt: string;
  content: string;
  readingTimeMinutes: number;
  keyTakeaways?: string[];
  faq?: FaqItem[];
  /** Imagem de destaque no topo do artigo (WebP, ex.: 1200×630) */
  featuredImage?: string;
  /** Duas imagens injetadas no corpo (após 1ª e 2ª seção H2) (WebP, ex.: 800×450) */
  images?: BlogPostImage[];
}

function getSlugs(): string[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) return [];
    return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export function getReadingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function normalizeKeyTakeaways(takeaways: unknown): string[] | undefined {
  if (Array.isArray(takeaways)) {
    return takeaways.map((t) => (typeof t === "string" ? t : String(t)));
  }
  return undefined;
}

function getStr(obj: unknown, key: string): string | undefined {
  if (obj == null || typeof obj !== "object") return undefined;
  const v = (obj as Record<string, unknown>)[key];
  if (v == null) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
}

/** Garante path absoluto para imagens locais: sempre começa com / ou é URL completa. */
export function normalizeImageSrc(src: string | undefined): string | undefined {
  if (src == null || typeof src !== "string") return undefined;
  const s = src.trim();
  if (s === "") return undefined;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return s.startsWith("/") ? s : `/${s}`;
}

function normalizeImages(images: unknown): BlogPostImage[] | undefined {
  if (!Array.isArray(images) || images.length === 0) return undefined;
  const out: BlogPostImage[] = [];
  for (const item of images.slice(0, 2)) {
    if (!item || typeof item !== "object") continue;
    const rawSrc = getStr(item, "src") ?? getStr(item, "Src");
    const src = normalizeImageSrc(rawSrc);
    const alt = getStr(item, "alt") ?? getStr(item, "Alt");
    if (src && alt) {
      out.push({
        src,
        alt,
        caption: getStr(item, "caption") ?? getStr(item, "Caption") ?? undefined,
      });
    }
  }
  return out.length > 0 ? out : undefined;
}

/** Extrai pares pergunta/resposta do conteúdo a partir de seções "Perguntas frequentes" (### = pergunta, parágrafo seguinte = resposta). */
function extractFaqFromContent(content: string): FaqItem[] {
  const faq: FaqItem[] = [];
  const lines = content.split(/\r?\n/);
  let inFaqSection = false;
  let currentQuestion: string | null = null;
  let currentAnswer: string[] = [];

  const flush = () => {
    if (currentQuestion && currentAnswer.length > 0) {
      faq.push({
        question: currentQuestion,
        answer: currentAnswer.filter(Boolean).join(" ").trim(),
      });
    }
    currentQuestion = null;
    currentAnswer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const heading = h2Match[1].trim();
      if (/perguntas\s+frequentes|faq/i.test(heading)) {
        inFaqSection = true;
        flush();
        continue;
      }
      inFaqSection = false;
      flush();
      continue;
    }

    if (inFaqSection && h3Match) {
      flush();
      currentQuestion = h3Match[1].trim();
      currentAnswer = [];
      continue;
    }

    if (inFaqSection && currentQuestion && line.trim() && !line.startsWith("#")) {
      currentAnswer.push(line.trim());
    }
  }

  flush();
  return faq;
}

function loadPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, content } = parseMarkdown(raw);
    const authorData = authors[frontmatter.author] ?? authors.paul;
    const readingTimeMinutes = getReadingTimeMinutes(content);
    const faq = extractFaqFromContent(content);
    const images = normalizeImages(frontmatter.images);
    return {
      slug: frontmatter.slug,
      title: frontmatter.title,
      date: frontmatter.date,
      author: frontmatter.author,
      authorData,
      category: frontmatter.category,
      excerpt: frontmatter.excerpt,
      content,
      readingTimeMinutes,
      keyTakeaways: normalizeKeyTakeaways(frontmatter.keyTakeaways),
      faq: faq.length > 0 ? faq : undefined,
      featuredImage: normalizeImageSrc(
        typeof frontmatter.featuredImage === "string" ? frontmatter.featuredImage : undefined
      ) ?? undefined,
      images,
    };
  } catch {
    return null;
  }
}

export function getPosts(limit?: number): BlogPost[] {
  const slugs = getSlugs();
  const posts = slugs
    .map((slug) => loadPost(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return limit ? posts.slice(0, limit) : posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return loadPost(slug);
}

export function getAllSlugs(): string[] {
  return getSlugs();
}

export function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
