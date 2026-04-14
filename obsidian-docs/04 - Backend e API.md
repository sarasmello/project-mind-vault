# 04 — Backend e API

## Stack Backend

| Tecnologia | Papel |
|-----------|-------|
| Next.js 15 API Routes | Servidor HTTP |
| tRPC v11 | Camada de API type-safe |
| Drizzle ORM | Queries e migrations |
| Zod | Validação de inputs |
| gray-matter + remark | Parser de Markdown/Obsidian |

---

## Setup tRPC

### `src/server/trpc/trpc.ts`
```ts
import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'

export const createTRPCContext = async () => {
  return { db } // instância do Drizzle
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError 
          ? error.cause.flatten() 
          : null,
      },
    }
  },
})

export const router = t.router
export const publicProcedure = t.procedure
// Futuramente: protectedProcedure com auth
```

### `src/server/trpc/router.ts` — Root Router
```ts
import { router } from './trpc'
import { domainsRouter } from './routers/domains'
import { principlesRouter } from './routers/principles'
import { dilemmasRouter } from './routers/dilemmas'
import { flashcardsRouter } from './routers/flashcards'
import { modelsRouter } from './routers/models'
import { progressRouter } from './routers/progress'

export const appRouter = router({
  domains:    domainsRouter,
  principles: principlesRouter,
  dilemmas:   dilemmasRouter,
  flashcards: flashcardsRouter,
  models:     modelsRouter,
  progress:   progressRouter,
})

export type AppRouter = typeof appRouter
```

---

## Routers Detalhados

### `routers/domains.ts`
```ts
export const domainsRouter = router({
  
  // Retorna todos os 8 domínios com contagem de princípios
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.domains.findMany({
      with: {
        domainPrinciples: { with: { principle: true } },
      },
      orderBy: asc(domains.order),
    })
  }),

  // Retorna um domínio completo pelo slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const domain = await ctx.db.query.domains.findFirst({
        where: eq(domains.slug, input.slug),
        with: {
          activities: { orderBy: asc(activities.order) },
          outcomes: true,
          domainPrinciples: { with: { principle: true } },
          models: true,
        },
      })
      if (!domain) throw new TRPCError({ code: 'NOT_FOUND' })
      return domain
    }),
})
```

### `routers/dilemmas.ts`
```ts
export const dilemmasRouter = router({
  
  // Retorna um dilema aleatório (ou filtrado por domínio)
  getRandom: publicProcedure
    .input(z.object({ domainId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const query = ctx.db.select().from(dilemmas)
      if (input.domainId) {
        query.where(eq(dilemmas.domainId, input.domainId))
      }
      const all = await query
      return all[Math.floor(Math.random() * all.length)]
    }),

  // Recebe a resposta do usuário e retorna feedback
  submitAnswer: publicProcedure
    .input(z.object({
      dilemmaId: z.string(),
      principleId: z.string(),
      sessionId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const dilemma = await ctx.db.query.dilemmas.findFirst({
        where: eq(dilemmas.id, input.dilemmaId),
        with: { correctPrinciple: true },
      })
      if (!dilemma) throw new TRPCError({ code: 'NOT_FOUND' })
      
      const isCorrect = dilemma.correctPrincipleId === input.principleId
      
      // Salva no histórico
      await ctx.db.insert(dilemmaAnswers).values({
        dilemmaId: input.dilemmaId,
        principleId: input.principleId,
        isCorrect,
        sessionId: input.sessionId,
        answeredAt: new Date(),
      })
      
      return {
        isCorrect,
        correctPrinciple: dilemma.correctPrinciple,
        explanation: dilemma.explanation,
        tip: dilemma.tip,
      }
    }),

  // Estatísticas do usuário no simulador
  getStats: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const answers = await ctx.db.select()
        .from(dilemmaAnswers)
        .where(eq(dilemmaAnswers.sessionId, input.sessionId))
      
      return {
        total: answers.length,
        correct: answers.filter(a => a.isCorrect).length,
        byPrinciple: groupBy(answers, 'principleId'),
      }
    }),
})
```

### `routers/flashcards.ts`
```ts
export const flashcardsRouter = router({
  
  // Retorna cards do Obsidian que precisam de revisão hoje
  getDueCards: publicProcedure
    .input(z.object({ limit: z.number().default(20) }))
    .query(async ({ ctx, input }) => {
      // 1. Lê todos os .md do vault Obsidian
      const allCards = await parseObsidianVault(
        process.env.OBSIDIAN_VAULT_PATH!
      )
      
      // 2. Busca progresso salvo no SQLite
      const progress = await ctx.db.select()
        .from(flashcardProgress)
        .where(lte(flashcardProgress.nextReview, new Date()))
      
      const progressMap = new Map(progress.map(p => [p.cardId, p]))
      
      // 3. Cards novos (sem progresso) + cards com revisão vencida
      const dueCards = allCards.filter(card => {
        const prog = progressMap.get(card.id)
        if (!prog) return true // nunca visto
        return prog.nextReview <= new Date()
      })
      
      return dueCards.slice(0, input.limit)
    }),

  // Salva avaliação do card e calcula próxima revisão (SM-2)
  submitReview: publicProcedure
    .input(z.object({
      cardId: z.string(),
      quality: z.number().min(0).max(5), // SM-2: 0=blackout, 5=perfeito
    }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.flashcardProgress.findFirst({
        where: eq(flashcardProgress.cardId, input.cardId),
      })
      
      const current = existing ?? { interval: 1, easiness: 2.5, repetitions: 0 }
      const next = calculateSM2(current, input.quality)
      
      await ctx.db.insert(flashcardProgress)
        .values({ cardId: input.cardId, ...next })
        .onConflictDoUpdate({
          target: flashcardProgress.cardId,
          set: next,
        })
      
      return next
    }),

  // Estatísticas de progresso geral
  getProgress: publicProcedure.query(async ({ ctx }) => {
    const allCards = await parseObsidianVault(process.env.OBSIDIAN_VAULT_PATH!)
    const progress = await ctx.db.select().from(flashcardProgress)
    
    return {
      total: allCards.length,
      reviewed: progress.length,
      mastered: progress.filter(p => p.interval >= 21).length,
      dueToday: progress.filter(p => p.nextReview <= new Date()).length,
    }
  }),
})
```

### `routers/models.ts`
```ts
export const modelsRouter = router({
  
  getAll: publicProcedure
    .input(z.object({
      domainId: z.string().optional(),
      type: z.enum(['analysis','planning','communication','estimation','risk','quality']).optional(),
      approach: z.enum(['predictive','agile','hybrid']).optional(),
      search: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      let query = ctx.db.select().from(models)
      
      if (input.domainId) {
        query = query.where(
          sql`json_each(${models.domainIds}) = ${input.domainId}`
        )
      }
      if (input.type)     query = query.where(eq(models.type, input.type))
      if (input.approach) query = query.where(
        sql`json_each(${models.approaches}) = ${input.approach}`
      )
      if (input.search) {
        query = query.where(
          or(
            like(models.name, `%${input.search}%`),
            like(models.tags, `%${input.search}%`)
          )
        )
      }
      
      return query
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const model = await ctx.db.query.models.findFirst({
        where: eq(models.id, input.id),
      })
      if (!model) throw new TRPCError({ code: 'NOT_FOUND' })
      return model
    }),
})
```

---

## Parser do Obsidian

### `src/lib/obsidian-parser.ts`
```ts
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface FlashcardData {
  id: string
  front: string
  back: string         // HTML renderizado
  domain: string
  principle?: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  source: string       // nome do arquivo .md
}

export async function parseObsidianVault(vaultPath: string): Promise<FlashcardData[]> {
  const cards: FlashcardData[] = []
  
  // Recursivamente lê todos os .md
  const files = await getAllMdFiles(vaultPath)
  
  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf-8')
    const { data: frontmatter, content: body } = matter(content)
    
    // Apenas arquivos com frontmatter type: flashcard
    if (frontmatter.type !== 'flashcard') continue
    
    // Extrai seções FRENTE e VERSO
    const sections = body.split('## VERSO')
    if (sections.length < 2) continue
    
    const frontRaw = sections[0].replace('## FRENTE', '').trim()
    const backRaw = sections[1].trim()
    
    const backHtml = await remark()
      .use(remarkHtml)
      .process(backRaw)
    
    cards.push({
      id: generateId(filePath),
      front: frontRaw,
      back: backHtml.toString(),
      domain: frontmatter.domain ?? 'geral',
      principle: frontmatter.principle,
      tags: frontmatter.tags ?? [],
      difficulty: frontmatter.difficulty ?? 'medium',
      source: path.basename(filePath),
    })
  }
  
  return cards
}

async function getAllMdFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      files.push(...await getAllMdFiles(fullPath))
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  
  return files
}

function generateId(filePath: string): string {
  // ID determinístico baseado no path relativo
  return Buffer.from(filePath).toString('base64url').slice(0, 16)
}
```

---

## Algoritmo SM-2

### `src/lib/sm2.ts`
```ts
interface SM2State {
  interval: number      // dias até próxima revisão
  easiness: number      // fator de facilidade (2.5 = padrão)
  repetitions: number   // quantas vezes revisado com sucesso
  nextReview: Date
  lastReview: Date
}

// quality: 0-5
// 0 = esqueceu completamente
// 3 = lembrou com dificuldade
// 5 = lembrou perfeitamente
export function calculateSM2(state: Partial<SM2State>, quality: number): SM2State {
  let { interval = 1, easiness = 2.5, repetitions = 0 } = state
  
  if (quality >= 3) {
    // Resposta correta
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easiness)
    
    repetitions += 1
  } else {
    // Resposta incorreta — reinicia
    repetitions = 0
    interval = 1
  }
  
  // Atualiza easiness (nunca abaixo de 1.3)
  easiness = Math.max(1.3,
    easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  )
  
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)
  
  return {
    interval,
    easiness: Math.round(easiness * 100) / 100,
    repetitions,
    nextReview,
    lastReview: new Date(),
  }
}
```

---

## Validações com Zod

```ts
// Schemas reutilizáveis
export const DomainSlugSchema = z.enum([
  'stakeholders', 'team', 'approach-development-lifecycle',
  'planning', 'project-work', 'delivery', 
  'measurement', 'uncertainty'
])

export const PrincipleIdSchema = z.string().uuid()

export const SM2QualitySchema = z.number().int().min(0).max(5)

export const SessionIdSchema = z.string().min(1).max(100)
```

---

## Tratamento de Erros

```ts
// Erros mapeados para o frontend
// TRPCError codes:
// NOT_FOUND       → 404 — recurso não encontrado
// BAD_REQUEST     → 400 — input inválido
// INTERNAL_SERVER_ERROR → 500 — erro inesperado

// No frontend:
const { data, error } = trpc.domains.getBySlug.useQuery({ slug })
if (error?.data?.code === 'NOT_FOUND') {
  return <NotFound />
}
```
