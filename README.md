# ✍️ Blog Pessoal

Blog pessoal minimalista com cara de revista. Os posts são arquivos **Markdown** dentro do projeto — o site lê, formata e publica sozinho. Rápido, ótimo pra SEO e sem banco de dados.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000?logo=markdown&logoColor=white)

## O que faz

- **Lista de posts** na home, do mais recente pro mais antigo
- **Página de leitura** com tipografia caprichada (estilo editorial)
- **Tempo de leitura** estimado automaticamente
- **Tags** e data em cada post
- **SEO por post** — título e descrição próprios pra cada página
- Páginas **geradas estaticamente** no build (carregam instantâneo)

## Como publicar um post

É só criar um arquivo `.md` na pasta `posts/` com um cabeçalho simples:

```markdown
---
title: Título do post
date: 2026-06-01
excerpt: Um resumo curto que aparece na home.
tags: tecnologia, web
---

Conteúdo do post em **Markdown** normal.
```

Salvou o arquivo, o post aparece no site. Sem painel, sem login, sem banco.

## O diferencial técnico

Os posts são lidos no **servidor** (Next.js Server Components leem o sistema de arquivos), convertidos de Markdown pra HTML com a lib `marked`, e entregues prontos no HTML — por isso carregam rápido e o Google indexa fácil. Cada post vira uma **página estática** no build via `generateStaticParams`.

## Stack

Next.js 16 (App Router + Server Components) · TypeScript · Tailwind CSS v4 · marked · Lucide. Sem banco — o conteúdo são arquivos `.md` no repositório.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Deploy

Pronto pra Vercel — importe o repositório, build padrão (`next build`), zero variáveis de ambiente.

---

Feito por [@joaomanfre3](https://github.com/joaomanfre3).
