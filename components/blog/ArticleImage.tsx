import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
}

export default function ArticleImage({
  src,
  alt,
  caption,
  featured = false,
}: ArticleImageProps) {
  const safeSrc = typeof src === "string" ? src.trim() : "";
  if (!safeSrc) return null;

  const w = featured ? 1200 : 800;
  const h = featured ? 630 : 450;
  const containerClass = featured
    ? "relative aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-sky-500/30 bg-slate-800/60"
    : "relative aspect-video w-full overflow-hidden rounded-xl border border-sky-500/20 bg-slate-800/40";

  return (
    <figure className={`w-full min-w-0 ${featured ? "my-8" : "my-10"}`}>
      <div className={containerClass}>
        <Image
          src={safeSrc}
          alt={alt ?? ""}
          width={w}
          height={h}
          className="h-full w-full object-cover"
          sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 800px"}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-sky-200/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
