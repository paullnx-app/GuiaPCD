import Link from "next/link";
import type { Author } from "@/lib/blog";

interface AuthorBioProps {
  author: Author;
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="mt-12 pt-8 border-t border-sky-800/60">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-sky-500/30"
          />
        )}
        <div>
          <h4 className="text-lg font-bold text-white">{author.name}</h4>
          <p className="text-emerald-400 font-medium text-sm mb-2">{author.role}</p>
          <p className="text-sky-100/80 text-sm leading-relaxed">{author.bio}</p>
          <Link
            href="/blog"
            className="inline-block mt-3 text-emerald-400 font-semibold hover:text-emerald-300 transition text-sm"
          >
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </div>
  );
}
