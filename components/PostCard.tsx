import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { type PostMeta, formatDate } from "@/lib/posts";

// Server Component puro: sem estado, renderizado no servidor.
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-stone-200 py-7 first:pt-0">
      <Link href={`/post/${post.slug}`} className="block">
        {/* Tags + data */}
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={{ color: "var(--color-accent)" }}>
              {tag}
            </span>
          ))}
          <span aria-hidden>·</span>
          <time>{formatDate(post.date)}</time>
        </div>

        {/* Título */}
        <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tight transition group-hover:text-accent sm:text-3xl">
          {post.title}
        </h2>

        {/* Resumo */}
        <p className="mt-2 text-stone-600">{post.excerpt}</p>

        {/* Rodapé do card */}
        <div className="mt-3 flex items-center gap-4 text-sm text-stone-400">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readingTime} min de leitura
          </span>
          <span
            className="flex items-center gap-1 font-medium transition group-hover:gap-2"
            style={{ color: "var(--color-accent)" }}
          >
            Ler <ArrowRight size={15} />
          </span>
        </div>
      </Link>
    </article>
  );
}
