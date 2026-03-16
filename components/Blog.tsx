import Link from "next/link";
import { getPosts, formatDate } from "@/lib/blog";

export default function Blog() {
  const blogPosts = getPosts(3);

  return (
    <section id="blog" className="py-20 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
              Blog
            </p>
            <h2 className="text-balance text-2xl font-semibold text-white md:text-3xl">
              Nossos artigos
            </h2>
            <p className="max-w-2xl text-sm text-sky-100/80 md:text-base">
              Mantenha-se informado sobre isenção veicular e direitos PCD.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/40 bg-sky-900/40 px-5 py-2.5 text-sm font-semibold text-sky-100 transition hover:border-sky-300 hover:bg-sky-800/60"
          >
            Ver todos os artigos
            <span aria-hidden>→</span>
          </Link>
        </div>

        {blogPosts && blogPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-2xl border border-sky-800/80 bg-slate-900/60 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition hover:border-sky-300/80 hover:bg-slate-900"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-sky-400">
                  {post.category}
                </span>
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-white">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-xs text-sky-100/70">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readingTimeMinutes} min</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Ler mais
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-sky-700/60 bg-slate-900/60 py-12 text-center">
            <p className="text-sky-100/80">
              Nenhum artigo disponível no momento.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-block text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Visitar o blog
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
