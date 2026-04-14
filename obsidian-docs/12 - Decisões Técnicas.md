# 12 — Decisões Técnicas (ADRs)

## O que são ADRs
Architecture Decision Records — registros das decisões técnicas importantes, com o contexto, as opções consideradas e a razão da escolha. Útil para entender "por que fizemos assim" no futuro.

---

## ADR-001: Next.js 15 com App Router

**Status:** Aceito

**Contexto:** Precisamos de um framework web moderno que suporte Server Components para performance, Client Components para interatividade e boa DX.

**Opções consideradas:**
- Next.js 15 (App Router)
- Remix
- SvelteKit
- Astro + React islands

**Decisão:** Next.js 15

**Razões:**
- App Router com React Server Components: páginas estáticas sem JS no cliente onde não é necessário
- Ecossistema maduro e ampla base de conhecimento
- Integração nativa com Vercel para deploy
- tRPC tem suporte oficial para Next.js App Router
- shadcn/ui é construído para Next.js + Tailwind

---

## ADR-002: tRPC v11 para API

**Status:** Aceito

**Contexto:** Precisamos de uma camada de API que evite duplicação de tipos entre frontend e backend.

**Opções consideradas:**
- tRPC
- REST API manual
- GraphQL (Apollo/URQL)
- Server Actions do Next.js (apenas)

**Decisão:** tRPC v11

**Razões:**
- Type-safety end-to-end sem geração de código
- Zero boilerplate comparado a REST tipado manualmente
- Integração excelente com React Query para cache client-side
- Server Actions são ótimos mas não oferecem a mesma estrutura para APIs complexas
- GraphQL seria over-engineering para este projeto

---

## ADR-003: SQLite via Turso (não PostgreSQL)

**Status:** Aceito

**Contexto:** Precisamos de um banco de dados para o MVP que seja simples, barato e eficiente.

**Opções consideradas:**
- PostgreSQL (Neon, Supabase)
- SQLite local
- SQLite via Turso
- PlanetScale (MySQL)

**Decisão:** SQLite via Turso + `better-sqlite3` local

**Razões:**
- Dados do projeto são predominantemente leitura (domínios, princípios, modelos = seed fixo)
- Turso é gratuito para MVP e tem latência excelente em edge
- SQLite sem servidor = sem cold starts, sem connection pooling
- Drizzle tem suporte de primeira classe para SQLite/libSQL
- Migrar para PostgreSQL depois é trivial com Drizzle

**Trade-off aceito:** SQLite não tem suporte a JSON queries avançadas — workaround: JSON.parse nos campos array no código

---

## ADR-004: Obsidian como fonte dos Flashcards

**Status:** Aceito

**Contexto:** Os flashcards precisam ser editáveis facilmente sem tocar no código.

**Opções consideradas:**
- Armazenar tudo no banco (SQLite)
- CMS headless (Contentful, Sanity)
- Arquivos Markdown no repositório
- Obsidian vault lido em runtime

**Decisão:** Obsidian vault lido em runtime (desenvolvimento) + arquivos no repositório (produção)

**Razões:**
- Obsidian oferece experiência de escrita superior para conhecimento estruturado
- O vault já existe e é onde o usuário escreve suas notas de estudo
- gray-matter + remark é stack simples e confiável para parsing
- Separação clara: Obsidian = conteúdo, webapp = apresentação e progresso

**Trade-off aceito:** Em produção, precisa de sincronização manual (copiar `.md` para `public/`)

---

## ADR-005: Drizzle ORM (não Prisma)

**Status:** Aceito

**Contexto:** Precisamos de um ORM que funcione bem com SQLite/Turso e seja type-safe.

**Opções consideradas:**
- Prisma
- Drizzle ORM
- Kysely
- SQL direto

**Decisão:** Drizzle ORM

**Razões:**
- Suporte nativo e excelente para libSQL/Turso (Prisma tem suporte mais limitado)
- Schema em TypeScript puro (não DSL separada como Prisma)
- Queries type-safe sem geração de código extra
- Mais leve que Prisma (bundle menor, sem engine binária)
- `drizzle-kit studio` para inspeção visual do banco

---

## ADR-006: Zustand (não Redux/Jotai/Context)

**Status:** Aceito

**Contexto:** Precisamos de estado global client-side para o simulador e flashcards.

**Opções consideradas:**
- Redux Toolkit
- Jotai
- Zustand
- React Context

**Decisão:** Zustand

**Razões:**
- Estado é simples: progresso de sessão e estado de UI
- Zustand tem zero boilerplate (sem providers, actions, reducers)
- Integra naturalmente com React Query/tRPC para dados do servidor
- Jotai seria boa alternativa, mas Zustand tem API mais familiar
- Redux é over-engineering para este caso

---

## ADR-007: Tailwind CSS 4 + shadcn/ui

**Status:** Aceito

**Contexto:** Precisamos de um sistema de design visual consistente e de rápida implementação.

**Opções consideradas:**
- Tailwind + shadcn/ui
- CSS Modules
- Styled Components / Emotion
- Mantine UI
- Chakra UI

**Decisão:** Tailwind CSS 4 + shadcn/ui

**Razões:**
- shadcn/ui = componentes acessíveis (Radix) + Tailwind + sem dependência de biblioteca externa (copia código)
- Tailwind 4 tem melhor performance de build e sintaxe mais limpa
- Total controle sobre o design sem brigar com CSS de biblioteca
- Framer Motion integra perfeitamente com Tailwind
- Comunidade enorme, exemplos abundantes

---

## ADR-008: Framer Motion para Animações

**Status:** Aceito

**Contexto:** Precisamos de animações de qualidade para os cards, flips e transições.

**Opções consideradas:**
- Framer Motion
- CSS transitions puros
- React Spring
- GSAP

**Decisão:** Framer Motion

**Razões:**
- API declarativa que combina com React
- Animações de layout e shared elements out-of-the-box
- AnimatePresence para enter/exit de componentes
- Flip card 3D em poucas linhas
- Performance excelente com GPU acceleration automático
