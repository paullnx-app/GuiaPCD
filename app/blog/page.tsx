import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.guiapcd.com.br";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Blog - Guia PCD | Isenção Veicular e Direitos PCD",
  description:
    "Artigos sobre isenção veicular, laudos médicos, IPI, ICMS, IPVA e inclusão para pessoas com deficiência. Mantenha-se informado com o Guia PCD.",
  openGraph: {
    title: "Blog - Guia PCD | Isenção Veicular e Direitos PCD",
    description:
      "Artigos sobre isenção veicular, laudos médicos, IPI, ICMS, IPVA e inclusão para pessoas com deficiência.",
    url: `${baseUrl}/blog`,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Guia PCD",
    description: "Artigos sobre isenção veicular e direitos PCD.",
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

function BlogJsonLd() {
  const posts = getPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Guia PCD",
    description: "Artigos sobre isenção veicular e direitos das pessoas com deficiência.",
    url: `${baseUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Guia PCD",
      url: baseUrl,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      url: `${baseUrl}/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: post.authorData.name,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <BlogJsonLd />
      <main className="min-h-screen bg-slate-950">
        <Header />
        <section className="py-16 text-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Blog </span>
                <span className="text-emerald-400">Guia PCD</span>
              </h1>
              <p className="text-xl text-sky-100/90 max-w-2xl">
                Mantenha-se informado sobre isenção veicular, laudos, direitos PCD e
                mais. Artigos atualizados para ajudar você em cada etapa.
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sky-100/80 text-lg">
                  Nenhum artigo disponível no momento.
                </p>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
