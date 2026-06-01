// Leitura dos posts em Markdown — roda no servidor (lê o sistema de arquivos).

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  /** Data ISO "AAAA-MM-DD". */
  date: string;
  excerpt: string;
  tags: string[];
  /** Tempo de leitura estimado em minutos. */
  readingTime: number;
}

export interface Post extends PostMeta {
  /** Corpo já convertido de Markdown pra HTML. */
  html: string;
}

/**
 * Separa o cabeçalho (frontmatter) do corpo de um arquivo .md.
 * Cabeçalho simples no formato "chave: valor" entre linhas de "---".
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) data[key] = value;
  }
  return { data, body: match[2] };
}

/** Estima o tempo de leitura a ~200 palavras por minuto. */
function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(slug: string): { data: Record<string, string>; body: string } {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  return parseFrontmatter(raw);
}

function toMeta(slug: string, data: Record<string, string>, body: string): PostMeta {
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    readingTime: estimateReadingTime(body),
  };
}

/** Lista os metadados de todos os posts, do mais recente pro mais antigo. */
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, body } = readPostFile(slug);
      return toMeta(slug, data, body);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Lista só os slugs — usado pra gerar as páginas estáticas. */
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Carrega um post completo (com o HTML do corpo), ou null se não existir. */
export function getPost(slug: string): Post | null {
  try {
    const { data, body } = readPostFile(slug);
    const meta = toMeta(slug, data, body);
    return { ...meta, html: marked.parse(body) as string };
  } catch {
    return null;
  }
}

/** Formata "AAAA-MM-DD" como "20 de maio de 2026". */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
