import matter from "gray-matter";

export interface BlogImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface MarkdownFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  keyTakeaways?: string[];
  /** Imagem de destaque (recomendado: 1200×630px, WebP) */
  featuredImage?: string;
  /** Mais duas imagens distribuídas no artigo (recomendado: 800×450px ou 1200×600px, WebP) */
  images?: BlogImage[];
}

export interface ParsedMarkdown {
  frontmatter: MarkdownFrontmatter;
  content: string;
}

export function parseMarkdown(source: string): ParsedMarkdown {
  const { data, content } = matter(source);
  return {
    frontmatter: data as MarkdownFrontmatter,
    content: content.trim(),
  };
}
