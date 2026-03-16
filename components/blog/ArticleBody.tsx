import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArticleImage from "./ArticleImage";
import type { BlogPostImage } from "@/lib/blog";

interface ArticleBodyProps {
  content: string;
  /** Duas imagens opcionais: 1ª após o bloco antes do primeiro H2, 2ª após o primeiro H2 */
  injectImages?: BlogPostImage[];
}

export default function ArticleBody({ content, injectImages }: ArticleBodyProps) {
  const prose =
    "article-body text-sky-100/90 text-lg leading-relaxed [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_strong]:text-white";

  const markdownBlock = (block: string) => (
    <div className={prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href?.startsWith("/") ? href : href}
              className="text-emerald-400 hover:text-emerald-300 underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {block}
      </ReactMarkdown>
    </div>
  );

  const hasInject = injectImages && injectImages.length > 0;
  if (!hasInject) {
    return markdownBlock(content);
  }

  const sections = content.split(/\r?\n(?=##\s)/);
  const image0 = injectImages[0];
  const image1 = injectImages[1];

  return (
    <div className="space-y-0">
      {sections.map((section, i) => (
        <div key={i}>
          {markdownBlock(section)}
          {i === 0 && image0 && typeof image0.src === "string" && image0.src.trim() && (
            <ArticleImage
              src={image0.src}
              alt={image0.alt ?? ""}
              caption={image0.caption}
              featured={false}
            />
          )}
          {i === 1 && image1 && typeof image1.src === "string" && image1.src.trim() && (
            <ArticleImage
              src={image1.src}
              alt={image1.alt ?? ""}
              caption={image1.caption}
              featured={false}
            />
          )}
        </div>
      ))}
    </div>
  );
}
