import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug: string;
}

export default function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-sky-800/60">
      <h3 className="text-xl font-bold text-white mb-4">Leia também</h3>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block p-4 rounded-xl border border-sky-500/30 bg-slate-800/60 hover:bg-slate-800 hover:border-sky-500/50 transition"
            >
              <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">
                {post.category}
              </span>
              <h4 className="font-bold text-white mt-1 line-clamp-2">
                {post.title}
              </h4>
              <span className="text-sky-200/70 text-sm">{formatDate(post.date)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
