import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

// Server Component: lê os posts no servidor e monta a lista já pronta.
export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      {/* Cabeçalho do blog */}
      <header className="mb-14 border-b border-stone-200 pb-10">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          Blog Pessoal
        </h1>
        <p className="mt-3 text-lg text-stone-600">
          Ideias, aprendizados e bastidores de desenvolvimento web.
        </p>
      </header>

      {/* Lista de posts */}
      {posts.length === 0 ? (
        <p className="text-stone-500">Nenhum post publicado ainda.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <footer className="mt-16 border-t border-stone-200 pt-8 text-sm text-stone-400">
        Feito com Next.js · posts escritos em Markdown.
      </footer>
    </main>
  );
}
