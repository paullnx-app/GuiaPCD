import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getPostBySlug,
  getAllSlugs,
  getPosts,
  formatDate,
} from "@/lib/blog";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleImage from "@/components/blog/ArticleImage";
import KeyTakeaways from "@/components/blog/KeyTakeaways";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedPosts from "@/components/blog/RelatedPosts";
import CtaBox from "@/components/blog/CtaBox";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.guiapcd.com.br";

export const runtime = "nodejs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Artigo não encontrado" };
  }
  const url = `${baseUrl}/blog/${post.slug}`;
  const ogImage = post.featuredImage
    ? { url: post.featuredImage.startsWith("http") ? post.featuredImage : `${baseUrl}${post.featuredImage}`, width: 1200, height: 630, alt: post.title }
    : undefined;
  return {
    title: `${post.title} | Blog Guia PCD`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.authorData.name],
      locale: "pt_BR",
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

function ArticleJsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.authorData.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Guia PCD",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    ...(post.featuredImage && {
      image:
        post.featuredImage.startsWith("http")
          ? post.featuredImage
          : `${baseUrl}${post.featuredImage}`,
    }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FaqJsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
}) {
  if (!post.faq || post.faq.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  if (process.env.NODE_ENV === "development") {
    console.log("[blog images diagnostic]", { slug, featuredImage: post.featuredImage, imagesLength: post.images?.length ?? 0, images: post.images });
  }

  const allPosts = getPosts();

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />
      <FaqJsonLd post={post} />
      <main className="min-h-screen bg-slate-950">
        <Header />
        <article className="py-12 text-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="mb-6 text-sm text-sky-200/70" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-emerald-400 transition">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-sky-100 truncate max-w-[12rem] md:max-w-none inline-block">{post.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 text-sm text-sky-200/80 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/40 bg-sky-900/40 px-3 py-1 text-xs font-medium text-sky-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {post.category}
              </span>
              <span>{post.readingTimeMinutes} min</span>
              <span className="mx-2">•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="mx-2">•</span>
              <span>{post.authorData.name}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {post.featuredImage && post.featuredImage.trim() && (
              <ArticleImage
                src={post.featuredImage}
                alt={post.title ?? ""}
                featured
              />
            )}

            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <KeyTakeaways items={post.keyTakeaways} />
            )}

            <ArticleBody content={post.content} injectImages={post.images} />

            <CtaBox />

            <AuthorBio author={post.authorData} />

            <RelatedPosts posts={allPosts} currentSlug={post.slug} />
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
