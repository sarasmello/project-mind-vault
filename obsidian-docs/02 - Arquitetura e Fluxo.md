# 02 — Arquitetura e Fluxo

## Diagrama Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUÁRIO (Browser)                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP / WebSocket
┌───────────────────────────▼─────────────────────────────────────┐
│                    Next.js 15 (App Router)                      │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │  /app        │  │  /components │  │  /lib              │    │
│  │  (pages RSC) │  │  (shadcn/ui) │  │  (utils, parsers)  │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   tRPC Router                            │   │
│  │  domainsRouter | principlesRouter | dilemmasRouter       │   │
│  │  flashcardsRouter | modelsRouter | progressRouter        │   │
│  └──────────────────────────┬───────────────────────────────┘   │
└──────────────────────────── │ ──────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                    Drizzle ORM                                  │
│              (type-safe queries + migrations)                   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
          ┌───────────────────┴──────────────────┐
          │                                      │
┌─────────▼──────────┐              ┌────────────▼────────────┐
│  SQLite (Turso)    │              │  Obsidian Vault (.md)   │
│  - domínios        │              │  - flashcards           │
│  - princípios      │              │  - conteúdo dinâmico    │
│  - dilemas         │              │  (leitura em tempo real)│
│  - modelos         │              └─────────────────────────┘
│  - progresso user  │
└────────────────────┘
```

---

## Estrutura de Pastas do Projeto

```
pmbok7-navigator/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home — Explorador de Domínios
│   │   ├── domains/
│   │   │   └── [slug]/page.tsx       # Detalhe de um domínio
│   │   ├── simulator/
│   │   │   └── page.tsx              # Simulador de Dilemas
│   │   ├── flashcards/
│   │   │   └── page.tsx              # Sessão de flashcards
│   │   ├── models/
│   │   │   └── page.tsx              # Mapeador de Modelos
│   │   └── api/
│   │       └── trpc/[trpc]/route.ts  # tRPC handler
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── domain-card.tsx           # Card de domínio
│   │   ├── principle-badge.tsx       # Badge de princípio
│   │   ├── dilemma-card.tsx          # Card do simulador
│   │   ├── flashcard.tsx             # Flashcard flip
│   │   ├── model-card.tsx            # Card de modelo/ferramenta
│   │   └── navigation.tsx            # Nav principal
│   │
│   ├── server/
│   │   ├── db/
│   │   │   ├── schema.ts             # Schema Drizzle
│   │   │   ├── index.ts              # Conexão DB
│   │   │   └── seed.ts               # Seed completo
│   │   └── trpc/
│   │       ├── router.ts             # Root router
│   │       ├── trpc.ts               # Setup tRPC
│   │       └── routers/
│   │           ├── domains.ts
│   │           ├── principles.ts
│   │           ├── dilemmas.ts
│   │           ├── flashcards.ts
│   │           ├── models.ts
│   │           └── progress.ts
│   │
│   ├── lib/
│   │   ├── obsidian-parser.ts        # Lê .md do vault
│   │   ├── sm2.ts                    # Algoritmo spaced repetition
│   │   ├── trpc-client.ts            # Client-side tRPC
│   │   └── utils.ts
│   │
│   └── store/
│       ├── simulator-store.ts        # Zustand — estado do simulador
│       └── flashcard-store.ts        # Zustand — sessão de flashcards
│
├── obsidian-vault/                   # Symlink ou path para o cofre
├── drizzle/
│   └── migrations/                   # Migrations geradas
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Fluxo de Dados por Funcionalidade

### Explorador de Domínios
```
Home (RSC)
  → tRPC: domains.getAll()
    → Drizzle: SELECT * FROM domains WITH principles
      → Renderiza 8 DomainCards
        → Click → /domains/[slug]
          → tRPC: domains.getBySlug(slug)
            → Retorna atividades + princípios relacionados
```

### Simulador de Dilemas
```
/simulator (Client Component)
  → tRPC: dilemmas.getRandom()
    → Drizzle: SELECT random dilemma
      → Usuário seleciona princípio
        → tRPC: dilemmas.submitAnswer({dilemmaId, principleId})
          → Compara com correct_principle_id
            → Salva em user_progress
              → Retorna feedback + explicação
```

### Flashcards
```
/flashcards (Client Component)
  → tRPC: flashcards.getDueCards()
    → Obsidian Parser: lê .md do vault
    + Drizzle: busca progresso salvo (next_review, interval)
      → Filtra cards com next_review <= today
        → Usuário avalia (fácil/médio/difícil)
          → tRPC: flashcards.submitReview({cardId, quality})
            → SM-2 calcula próximo intervalo
              → Salva em flashcard_progress
```

### Mapeador de Modelos
```
/models (RSC)
  → tRPC: models.getAll({filters})
    → Drizzle: SELECT * FROM models WHERE domain_id = ? AND type = ?
      → Renderiza grid de ModelCards
        → Click → Modal com detalhes completos
```

---

## Decisões de Arquitetura

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Rendering | Server Components + Client onde necessário | SEO + performance sem sacrificar interatividade |
| API | tRPC | Type-safety end-to-end, zero boilerplate de tipos |
| ORM | Drizzle | Leve, TypeScript-first, excelente com SQLite |
| Estado | Zustand | Simples, sem boilerplate Redux |
| Estilo | Tailwind + shadcn/ui | Velocidade de desenvolvimento + qualidade visual |
| Banco | SQLite/Turso | Perfeito para MVP, gratuito, sem servidor separado |
| Flashcards fonte | Obsidian .md | Edição rápida sem tocar no código |

---

## Variáveis de Ambiente

```env
# .env.local
DATABASE_URL=libsql://seu-banco.turso.io
DATABASE_AUTH_TOKEN=seu-token-turso
OBSIDIAN_VAULT_PATH=/caminho/para/cofre/Sara Teste
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
