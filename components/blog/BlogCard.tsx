import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="rounded-2xl overflow-hidden border border-sky-500/30 bg-slate-800/80 shadow-lg hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full backdrop-blur">
      {post.featuredImage && (
        <Link href={`/blog/${post.slug}`} className="block shrink-0">
          <div className="relative aspect-[1200/630] w-full overflow-hidden bg-slate-800/60">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 text-sm mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/40 bg-sky-900/40 px-3 py-1 text-xs font-medium text-sky-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {post.category}
          </span>
          <span className="text-sky-200/70">{post.readingTimeMinutes} min</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sky-100/80 text-sm mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center text-sky-200/70 text-sm mb-4">
          <span>{post.authorData.name}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-auto text-emerald-400 font-semibold hover:text-emerald-300 transition"
        >
          Ler artigo »
        </Link>
      </div>
    </article>
  );
}
