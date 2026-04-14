# 05 — Banco de Dados

## Tecnologia
- **SQLite** via **Turso** (produção) ou `better-sqlite3` (local)
- **Drizzle ORM** para schema, queries e migrations
- **Drizzle Kit** para geração de migrations

---

## Schema Completo (`src/server/db/schema.ts`)

```ts
import { 
  sqliteTable, text, integer, real, index 
} from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

// ─────────────────────────────────────────
// DOMÍNIOS DE DESEMPENHO (8 no total)
// ─────────────────────────────────────────
export const domains = sqliteTable('domains', {
  id:          text('id').primaryKey().$defaultFn(() => createId()),
  slug:        text('slug').notNull().unique(),
  name:        text('name').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  color:       text('color').notNull(),        // hex color
  icon:        text('icon').notNull(),          // nome ícone Lucide
  order:       integer('order').notNull(),       // 1-8
  createdAt:   integer('created_at', { mode: 'timestamp' })
                 .$defaultFn(() => new Date()),
})

// ─────────────────────────────────────────
// ATIVIDADES DOS DOMÍNIOS
// ─────────────────────────────────────────
export const activities = sqliteTable('activities', {
  id:          text('id').primaryKey().$defaultFn(() => createId()),
  domainId:    text('domain_id').notNull().references(() => domains.id),
  title:       text('title').notNull(),
  description: text('description').notNull(),
  order:       integer('order').notNull(),
})

// ─────────────────────────────────────────
// RESULTADOS ESPERADOS DOS DOMÍNIOS
// ─────────────────────────────────────────
export const outcomes = sqliteTable('outcomes', {
  id:       text('id').primaryKey().$defaultFn(() => createId()),
  domainId: text('domain_id').notNull().references(() => domains.id),
  text:     text('text').notNull(),
  order:    integer('order').notNull(),
})

// ─────────────────────────────────────────
// PRINCÍPIOS DE ENTREGA (12 no total)
// ─────────────────────────────────────────
export const principles = sqliteTable('principles', {
  id:               text('id').primaryKey().$defaultFn(() => createId()),
  slug:             text('slug').notNull().unique(),
  name:             text('name').notNull(),
  shortDescription: text('short_description').notNull(),
  fullDescription:  text('full_description').notNull(),
  rationale:        text('rationale').notNull(),    // por que este princípio
  examples:         text('examples').notNull(),      // JSON array de exemplos
  color:            text('color').notNull(),
  order:            integer('order').notNull(),
})

// ─────────────────────────────────────────
// RELAÇÃO DOMÍNIO ↔ PRINCÍPIOS (N:N)
// ─────────────────────────────────────────
export const domainPrinciples = sqliteTable('domain_principles', {
  domainId:    text('domain_id').notNull().references(() => domains.id),
  principleId: text('principle_id').notNull().references(() => principles.id),
  relevance:   text('relevance'),  // nota sobre por que se relacionam
}, (table) => ({
  pk: primaryKey({ columns: [table.domainId, table.principleId] }),
}))

// ─────────────────────────────────────────
// DILEMAS DO SIMULADOR
// ─────────────────────────────────────────
export const dilemmas = sqliteTable('dilemmas', {
  id:                 text('id').primaryKey().$defaultFn(() => createId()),
  domainId:           text('domain_id').references(() => domains.id),
  scenario:           text('scenario').notNull(),       // o problema apresentado
  context:            text('context'),                   // contexto adicional
  correctPrincipleId: text('correct_principle_id')
                        .notNull()
                        .references(() => principles.id),
  explanation:        text('explanation').notNull(),     // por que este princípio
  tip:                text('tip'),                       // dica extra
  difficulty:         text('difficulty', {
                        enum: ['easy', 'medium', 'hard']
                      }).notNull().default('medium'),
  options:            text('options').notNull(),         // JSON: 5 princípios como opções
  createdAt:          integer('created_at', { mode: 'timestamp' })
                        .$defaultFn(() => new Date()),
}, (table) => ({
  domainIdx: index('dilemmas_domain_idx').on(table.domainId),
}))

// ─────────────────────────────────────────
// RESPOSTAS DOS DILEMAS (histórico)
// ─────────────────────────────────────────
export const dilemmaAnswers = sqliteTable('dilemma_answers', {
  id:          text('id').primaryKey().$defaultFn(() => createId()),
  dilemmaId:   text('dilemma_id').notNull().references(() => dilemmas.id),
  principleId: text('principle_id').notNull().references(() => principles.id),
  isCorrect:   integer('is_correct', { mode: 'boolean' }).notNull(),
  sessionId:   text('session_id').notNull(),
  answeredAt:  integer('answered_at', { mode: 'timestamp' })
                 .$defaultFn(() => new Date()),
}, (table) => ({
  sessionIdx: index('answers_session_idx').on(table.sessionId),
}))

// ─────────────────────────────────────────
// PROGRESSO DOS FLASHCARDS (SM-2)
// ─────────────────────────────────────────
export const flashcardProgress = sqliteTable('flashcard_progress', {
  cardId:      text('card_id').primaryKey(),  // ID derivado do path .md
  interval:    integer('interval').notNull().default(1),
  easiness:    real('easiness').notNull().default(2.5),
  repetitions: integer('repetitions').notNull().default(0),
  nextReview:  integer('next_review', { mode: 'timestamp' }).notNull(),
  lastReview:  integer('last_review', { mode: 'timestamp' }).notNull(),
  quality:     integer('quality').notNull(),  // última avaliação 0-5
}, (table) => ({
  nextReviewIdx: index('flashcard_next_review_idx').on(table.nextReview),
}))

// ─────────────────────────────────────────
// MODELOS E MÉTODOS (ferramentas PMBOK 7)
// ─────────────────────────────────────────
export const models = sqliteTable('models', {
  id:          text('id').primaryKey().$defaultFn(() => createId()),
  name:        text('name').notNull(),
  slug:        text('slug').notNull().unique(),
  type:        text('type', {
                 enum: ['analysis','planning','communication',
                        'estimation','risk','quality','other']
               }).notNull(),
  domainIds:   text('domain_ids').notNull(),    // JSON array de domain IDs
  approaches:  text('approaches').notNull(),     // JSON: ['predictive','agile','hybrid']
  summary:     text('summary').notNull(),
  whenToUse:   text('when_to_use').notNull(),
  howToUse:    text('how_to_use').notNull(),     // passo a passo
  example:     text('example').notNull(),
  tags:        text('tags').notNull(),           // JSON array
  references:  text('references'),              // seção do PMBOK 7
  createdAt:   integer('created_at', { mode: 'timestamp' })
                 .$defaultFn(() => new Date()),
}, (table) => ({
  typeIdx: index('models_type_idx').on(table.type),
}))

// ─────────────────────────────────────────
// RELATIONS (para queries com .with())
// ─────────────────────────────────────────
export const domainsRelations = relations(domains, ({ many }) => ({
  activities:       many(activities),
  outcomes:         many(outcomes),
  domainPrinciples: many(domainPrinciples),
  dilemmas:         many(dilemmas),
}))

export const principlesRelations = relations(principles, ({ many }) => ({
  domainPrinciples: many(domainPrinciples),
  dilemmas:         many(dilemmas),
}))

export const domainPrinciplesRelations = relations(domainPrinciples, ({ one }) => ({
  domain:    one(domains,    { fields: [domainPrinciples.domainId],    references: [domains.id] }),
  principle: one(principles, { fields: [domainPrinciples.principleId], references: [principles.id] }),
}))

export const dilemmasRelations = relations(dilemmas, ({ one, many }) => ({
  domain:           one(domains,    { fields: [dilemmas.domainId],           references: [domains.id] }),
  correctPrinciple: one(principles, { fields: [dilemmas.correctPrincipleId], references: [principles.id] }),
  answers:          many(dilemmaAnswers),
}))
```

---

## Conexão com o Banco (`src/server/db/index.ts`)

```ts
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const client = createClient({
  url:       process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })
export type DB = typeof db
```

**Para desenvolvimento local (sem Turso):**
```ts
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('./local.db')
export const db = drizzle(sqlite, { schema })
```

---

## drizzle.config.ts

```ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema:  './src/server/db/schema.ts',
  out:     './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./local.db',
  },
})
```

---

## Seed Completo (`src/server/db/seed.ts`)

```ts
// Executar com: npx tsx src/server/db/seed.ts

import { db } from './index'
import { domains, principles, domainPrinciples, 
         activities, outcomes, dilemmas, models } from './schema'

async function seed() {
  console.log('🌱 Iniciando seed...')
  
  // ── 1. PRINCÍPIOS (12) ──────────────────────────────────────
  const principlesData = [
    {
      slug: 'stewardship',
      name: 'Ser um administrador zeloso, confiável e ético',
      shortDescription: 'Agir com integridade, cuidado e confiança',
      fullDescription: 'Os gerentes de projeto têm a responsabilidade de agir como guardiões da organização e do projeto, tomando decisões éticas e sendo confiáveis por todas as partes.',
      rationale: 'Projetos falham quando há falta de confiança. A ética é a base de todas as relações no projeto.',
      examples: JSON.stringify([
        'Reportar riscos mesmo que sejam inconvenientes',
        'Proteger dados confidenciais dos stakeholders',
        'Reconhecer limitações e buscar ajuda quando necessário'
      ]),
      color: '#6366f1',
      order: 1,
    },
    {
      slug: 'team',
      name: 'Criar um ambiente colaborativo de equipe',
      shortDescription: 'Promover cultura de colaboração e responsabilidade compartilhada',
      fullDescription: 'Times de projeto funcionam melhor quando há cultura de colaboração, responsabilidade compartilhada e respeito mútuo.',
      rationale: 'Nenhum projeto é entregue por uma pessoa sozinha. O ambiente determina o desempenho coletivo.',
      examples: JSON.stringify([
        'Definir normas de equipe no início do projeto',
        'Celebrar conquistas coletivas',
        'Resolver conflitos de forma construtiva'
      ]),
      color: '#8b5cf6',
      order: 2,
    },
    {
      slug: 'stakeholders',
      name: 'Engajar efetivamente as partes interessadas',
      shortDescription: 'Envolver stakeholders para garantir entrega de valor',
      fullDescription: 'O engajamento proativo e contínuo das partes interessadas é essencial para o sucesso do projeto. Stakeholders ignorados se tornam resistência.',
      rationale: 'Stakeholders desengajados são a principal causa de projetos que entregam o tecnicamente correto, mas não o que o negócio precisava.',
      examples: JSON.stringify([
        'Mapear stakeholders por poder e interesse',
        'Comunicar progresso regularmente',
        'Incluir stakeholders nas decisões que os afetam'
      ]),
      color: '#06b6d4',
      order: 3,
    },
    {
      slug: 'value',
      name: 'Focar no valor',
      shortDescription: 'Alinhar continuamente o projeto com os resultados de negócio',
      fullDescription: 'O sucesso do projeto não é medido apenas pela entrega dentro do prazo e custo, mas pelo valor real gerado para os stakeholders e a organização.',
      rationale: 'Projetos "bem-sucedidos" que não geram valor são falhas disfarçadas.',
      examples: JSON.stringify([
        'Questionar o valor de cada requisito antes de implementar',
        'Medir benefícios, não apenas outputs',
        'Renegociar escopo quando o valor esperado muda'
      ]),
      color: '#10b981',
      order: 4,
    },
    {
      slug: 'systems-thinking',
      name: 'Reconhecer, avaliar e responder às interações do sistema',
      shortDescription: 'Pensar sistemicamente além das fronteiras do projeto',
      fullDescription: 'Projetos existem dentro de sistemas maiores. Decisões têm consequências além do projeto imediato.',
      rationale: 'Soluções locais criam problemas sistêmicos quando não se considera o todo.',
      examples: JSON.stringify([
        'Analisar impactos de mudança em outros sistemas',
        'Considerar dependências organizacionais',
        'Avaliar efeitos colaterais das decisões'
      ]),
      color: '#f59e0b',
      order: 5,
    },
    {
      slug: 'leadership',
      name: 'Demonstrar comportamentos de liderança',
      shortDescription: 'Liderar pelo exemplo, adaptando o estilo ao contexto',
      fullDescription: 'Liderança eficaz vai além do título. Inclui motivar, influenciar, comunicar e servir a equipe.',
      rationale: 'Times precisam de direção e suporte. Sem liderança, projetos complexos se perdem.',
      examples: JSON.stringify([
        'Adaptar estilo de liderança (diretivo, coach, delegativo)',
        'Remover impedimentos para a equipe',
        'Criar visão compartilhada do objetivo'
      ]),
      color: '#ef4444',
      order: 6,
    },
    {
      slug: 'tailoring',
      name: 'Adaptar com base no contexto',
      shortDescription: 'Personalizar abordagem para o contexto específico',
      fullDescription: 'Não existe uma abordagem única. O gerente deve adaptar processos, ferramentas e métodos ao contexto do projeto.',
      rationale: 'Seguir metodologia rigidamente sem adaptar ao contexto é receita para ineficiência.',
      examples: JSON.stringify([
        'Escolher entre preditivo, ágil ou híbrido conscientemente',
        'Ajustar nível de documentação ao risco do projeto',
        'Simplificar processos para projetos pequenos'
      ]),
      color: '#ec4899',
      order: 7,
    },
    {
      slug: 'quality',
      name: 'Incorporar qualidade nos processos e entregas',
      shortDescription: 'Qualidade é construída, não inspecionada depois',
      fullDescription: 'Qualidade deve ser integrada às atividades do projeto, não verificada apenas ao final.',
      rationale: 'Detectar problemas de qualidade tarde custa exponencialmente mais do que preveni-los.',
      examples: JSON.stringify([
        'Definir critérios de aceitação antes de começar',
        'Revisões de qualidade durante o trabalho',
        'Métricas de qualidade desde o início'
      ]),
      color: '#14b8a6',
      order: 8,
    },
    {
      slug: 'complexity',
      name: 'Navegar na complexidade',
      shortDescription: 'Usar abordagens adaptativas para ambientes complexos',
      fullDescription: 'Projetos complexos têm comportamentos emergentes e não-lineares. Requerem abordagens diferentes de projetos complicados.',
      rationale: 'Tratar complexidade como complicado leva a soluções que não funcionam no mundo real.',
      examples: JSON.stringify([
        'Usar iterações curtas para reduzir incerteza',
        'Experimentar antes de comprometer grandes investimentos',
        'Aceitar que o plano vai mudar'
      ]),
      color: '#7c3aed',
      order: 9,
    },
    {
      slug: 'risk',
      name: 'Otimizar respostas a riscos',
      shortDescription: 'Identificar e responder a ameaças e oportunidades',
      fullDescription: 'Risco não é apenas ameaça — inclui oportunidades. A gestão de riscos deve ser contínua e proporcional.',
      rationale: 'Projetos sem gestão de riscos são reativos. Com ela, são proativos.',
      examples: JSON.stringify([
        'Identificar riscos regularmente em cerimônias da equipe',
        'Explorar oportunidades, não apenas mitigar ameaças',
        'Ter planos de contingência para riscos críticos'
      ]),
      color: '#dc2626',
      order: 10,
    },
    {
      slug: 'adaptability',
      name: 'Abraçar adaptabilidade e resiliência',
      shortDescription: 'Manter flexibilidade sem perder o foco no objetivo',
      fullDescription: 'Projetos precisam se adaptar a mudanças internas e externas. Resiliência é a capacidade de absorver mudanças e continuar.',
      rationale: 'O ambiente de projetos é dinâmico. Rigidez excessiva cria fragilidade.',
      examples: JSON.stringify([
        'Construir buffers de tempo e custo',
        'Revisar e ajustar planos regularmente',
        'Aprender com falhas sem culpabilização'
      ]),
      color: '#0891b2',
      order: 11,
    },
    {
      slug: 'change',
      name: 'Permitir mudança para alcançar o estado futuro esperado',
      shortDescription: 'Facilitar a mudança organizacional que o projeto requer',
      fullDescription: 'Projetos mudam organizações. O gerente deve considerar a gestão da mudança organizacional como parte do trabalho.',
      rationale: 'Projetos técnicos perfeitos falham quando a organização não adota o resultado.',
      examples: JSON.stringify([
        'Envolver usuários finais desde o início',
        'Planejar treinamentos e comunicação da mudança',
        'Medir adoção, não apenas implantação'
      ]),
      color: '#059669',
      order: 12,
    },
  ]

  await db.insert(principles).values(principlesData)
  console.log('✅ 12 princípios inseridos')

  // ── 2. DOMÍNIOS (8) ─────────────────────────────────────────
  const domainsData = [
    {
      slug: 'stakeholders',
      name: 'Stakeholders',
      description: 'Atividades e funções associadas ao engajamento das partes interessadas.',
      longDescription: 'Este domínio foca em identificar, compreender e engajar efetivamente todas as partes interessadas ao longo do ciclo de vida do projeto.',
      color: '#6366f1',
      icon: 'Users',
      order: 1,
    },
    {
      slug: 'team',
      name: 'Equipe',
      description: 'Atividades e funções associadas às pessoas responsáveis por produzir as entregas.',
      longDescription: 'Cobre liderança, desenvolvimento da equipe, cultura, diversidade e criação de ambiente de alto desempenho.',
      color: '#8b5cf6',
      icon: 'HandshakeIcon',
      order: 2,
    },
    {
      slug: 'development-approach',
      name: 'Abordagem de Desenvolvimento e Ciclo de Vida',
      description: 'Atividades e funções associadas à abordagem de desenvolvimento, cadência e fases do projeto.',
      longDescription: 'Determinar a abordagem correta (preditiva, ágil, híbrida) e estruturar o ciclo de vida adequadamente.',
      color: '#06b6d4',
      icon: 'GitBranch',
      order: 3,
    },
    {
      slug: 'planning',
      name: 'Planejamento',
      description: 'Atividades e funções associadas à organização e coordenação inicial e contínua.',
      longDescription: 'Planejamento adaptativo que evolui ao longo do projeto, não um plano rígido feito uma vez.',
      color: '#3b82f6',
      icon: 'ClipboardList',
      order: 4,
    },
    {
      slug: 'project-work',
      name: 'Trabalho do Projeto',
      description: 'Atividades e funções associadas ao estabelecimento de processos e execução do trabalho.',
      longDescription: 'Gerenciar o trabalho do dia a dia: processos, comunicações, recursos físicos, aquisições.',
      color: '#f59e0b',
      icon: 'Wrench',
      order: 5,
    },
    {
      slug: 'delivery',
      name: 'Entrega',
      description: 'Atividades e funções associadas à entrega do escopo e da qualidade.',
      longDescription: 'Garantir que as entregas atendam aos requisitos, critérios de aceitação e gerem o valor esperado.',
      color: '#10b981',
      icon: 'Package',
      order: 6,
    },
    {
      slug: 'measurement',
      name: 'Medição',
      description: 'Atividades e funções associadas à avaliação do desempenho do projeto.',
      longDescription: 'Definir métricas, coletar dados, interpretar resultados e tomar decisões baseadas em dados.',
      color: '#ec4899',
      icon: 'BarChart2',
      order: 7,
    },
    {
      slug: 'uncertainty',
      name: 'Incerteza',
      description: 'Atividades e funções associadas a riscos e incertezas.',
      longDescription: 'Identificar e responder a ameaças e oportunidades em ambientes de alta ambiguidade e volatilidade.',
      color: '#ef4444',
      icon: 'CloudLightning',
      order: 8,
    },
  ]

  await db.insert(domains).values(domainsData)
  console.log('✅ 8 domínios inseridos')

  // ── 3. ATIVIDADES (exemplos) ─────────────────────────────────
  // (truncado no seed — ver arquivo completo no repositório)

  // ── 4. MODELOS E MÉTODOS ─────────────────────────────────────
  const modelsData = [
    {
      slug: 'stakeholder-power-interest-grid',
      name: 'Matriz de Poder/Interesse',
      type: 'analysis',
      domainIds: JSON.stringify(['stakeholders']),
      approaches: JSON.stringify(['predictive', 'agile', 'hybrid']),
      summary: 'Classifica stakeholders por nível de poder e interesse para definir estratégia de engajamento.',
      whenToUse: 'No início do projeto e sempre que novos stakeholders forem identificados.',
      howToUse: '1. Liste todos os stakeholders\n2. Avalie poder (influência) de 1-5\n3. Avalie interesse (impacto) de 1-5\n4. Plote na matriz 2x2\n5. Defina estratégia: Gerenciar de perto | Manter satisfeito | Manter informado | Monitorar',
      example: 'Diretor Financeiro: alto poder, baixo interesse → Manter satisfeito com relatórios executivos mensais.',
      tags: JSON.stringify(['stakeholder', 'análise', 'engajamento', 'comunicação']),
      references: 'PMBOK 7, Seção 2.1',
    },
    {
      slug: 'retrospective',
      name: 'Retrospectiva',
      type: 'quality',
      domainIds: JSON.stringify(['team', 'project-work']),
      approaches: JSON.stringify(['agile', 'hybrid']),
      summary: 'Cerimônia para reflexão sobre o processo e identificação de melhorias.',
      whenToUse: 'Ao final de cada iteração/sprint ou fase do projeto.',
      howToUse: '1. O que foi bem?\n2. O que pode melhorar?\n3. O que faremos diferente?\n4. Plano de ação com responsáveis',
      example: 'Sprint 3 retro: entrega atrasou por dependência externa → criar checklist de dependências no início de cada sprint.',
      tags: JSON.stringify(['melhoria contínua', 'equipe', 'retrospectiva', 'ágil']),
      references: 'PMBOK 7, Seção 4.2',
    },
    {
      slug: 'risk-register',
      name: 'Registro de Riscos',
      type: 'risk',
      domainIds: JSON.stringify(['uncertainty', 'planning']),
      approaches: JSON.stringify(['predictive', 'agile', 'hybrid']),
      summary: 'Documento vivo que cataloga riscos identificados, probabilidade, impacto e respostas.',
      whenToUse: 'Desde o início do projeto, atualizado continuamente.',
      howToUse: '1. Identifique riscos (brainstorm, histórico, especialistas)\n2. Avalie probabilidade (Alto/Médio/Baixo)\n3. Avalie impacto (Alto/Médio/Baixo)\n4. Calcule exposição (P × I)\n5. Defina resposta (evitar/mitigar/transferir/aceitar)\n6. Atribua dono do risco',
      example: 'Risco: fornecedor crítico pode falhar. P=Médio, I=Alto → Mitigar: identificar fornecedor alternativo.',
      tags: JSON.stringify(['risco', 'incerteza', 'registro', 'mitigação']),
      references: 'PMBOK 7, Seção 4.6',
    },
  ]

  await db.insert(models).values(modelsData)
  console.log('✅ Modelos inseridos')

  console.log('🎉 Seed completo!')
}

seed().catch(console.error)
```

---

## Migrations

```bash
# Gerar migration
npx drizzle-kit generate

# Aplicar migration
npx drizzle-kit migrate

# Push direto (dev)
npx drizzle-kit push

# Inspecionar banco
npx drizzle-kit studio
```

---

## Diagrama ER

```
domains ──────────────── domain_principles ──── principles
   │                                                  │
   │                     dilemmas ───────────────────►│
   │                        │
   ├── activities            └── dilemma_answers
   │
   └── outcomes

flashcard_progress  (standalone — ID vem do path .md)

models  (standalone — domainIds como JSON array)
```

---

## Índices e Performance

```ts
// Índices já definidos no schema:
// - dilemmas.domain_id → queries filtradas por domínio
// - dilemma_answers.session_id → histórico por sessão
// - flashcard_progress.next_review → cards vencidos hoje

// SQLite WAL mode para melhor performance de leitura:
// PRAGMA journal_mode=WAL;
// PRAGMA synchronous=NORMAL;
```
