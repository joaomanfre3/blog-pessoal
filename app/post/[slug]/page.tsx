import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock } from "lucide-react";
import { formatDate, getPost, getPostSlugs } from "@/lib/posts";

// Gera uma página estática pra cada post no build.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Metadata específica de cada post (bom pra SEO e compartilhamento).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post não encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      {/* Voltar */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition hover:text-accent"
      >
        <ArrowLeft size={16} /> Todos os posts
      </Link>

      {/* Cabeçalho do post */}
      <header className="mt-8 border-b border-stone-200 pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
          {post.tags.map((tag) => (
            <span key={tag} style={{ color: "var(--color-accent)" }}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-stone-500">
          <time>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readingTime} min de leitura
          </span>
        </div>
      </header>

      {/* Corpo (HTML gerado a partir do Markdown) */}
      <article
        className="prose mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}
