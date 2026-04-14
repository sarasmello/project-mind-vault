# 03 — Frontend

## Stack Frontend

| Tecnologia | Versão | Papel |
|-----------|--------|-------|
| Next.js | 15 (App Router) | Framework principal |
| TypeScript | 5.x | Tipagem |
| Tailwind CSS | 4.x | Estilização |
| shadcn/ui | latest | Componentes base |
| Framer Motion | 11.x | Animações |
| Zustand | 5.x | Estado global client-side |
| Lucide React | latest | Ícones |

---

## Páginas e Rotas

### `/` — Home: Explorador de Domínios
**Tipo:** Server Component (RSC)

```tsx
// Layout: grid 4x2 de DomainCards
// Dados: carregados server-side via tRPC
// Animação: cards entram com stagger (Framer Motion)

interface DomainCardProps {
  id: string
  slug: string
  name: string          // ex: "Stakeholders"
  description: string
  color: string         // ex: "#6366f1"
  icon: string          // nome do ícone Lucide
  principleCount: number
  activityCount: number
}
```

**Layout Visual:**
```
┌─────────────────────────────────────────────────────┐
│  PMBOK 7 Navigator                    [modo escuro] │
├─────────────────────────────────────────────────────┤
│  "Qual domínio você quer explorar hoje?"            │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │Stakehol. │ │  Equipe  │ │Abordagem │ │Planeja.│ │
│  │    👥    │ │    🤝    │ │    ⚙️    │ │  📋   │ │
│  │ 4 princ. │ │ 3 princ. │ │ 2 princ. │ │5 princ.│ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  Traba.  │ │ Entrega  │ │Incerteza │ │Medição │ │
│  │    🔨    │ │    🚀    │ │    🌫️   │ │  📊   │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                     │
│  [Simulador de Dilemas] [Flashcards] [Modelos]      │
└─────────────────────────────────────────────────────┘
```

---

### `/domains/[slug]` — Detalhe do Domínio
**Tipo:** Server Component + Client components internos

```tsx
// Seções:
// 1. Hero do domínio (nome, descrição, cor)
// 2. Atividades principais (accordion)
// 3. Resultados esperados (lista)
// 4. Princípios relacionados (badges clicáveis)
// 5. Modelos recomendados para este domínio
// 6. Botão: "Treinar com Dilemas deste domínio"
```

**Componente PrincipleBadge:**
```tsx
interface PrincipleBadgeProps {
  principle: {
    id: string
    name: string
    shortDescription: string
    color: string
  }
  size?: 'sm' | 'md' | 'lg'
  showTooltip?: boolean
}
// Tooltip ao hover mostra shortDescription
// Click abre modal com descrição completa
```

---

### `/simulator` — Simulador de Dilemas
**Tipo:** Client Component (interativo)

**Estado (Zustand — simulator-store.ts):**
```ts
interface SimulatorStore {
  currentDilemma: Dilemma | null
  selectedPrinciple: string | null
  showFeedback: boolean
  score: { correct: number; total: number }
  sessionHistory: AnswerRecord[]
  
  // Actions
  loadNextDilemma: () => void
  selectPrinciple: (id: string) => void
  submitAnswer: () => void
  resetSession: () => void
}
```

**Fluxo de tela:**
```
┌─────────────────────────────────────────────────┐
│  Simulador de Dilemas           Pontos: 7/10    │
├─────────────────────────────────────────────────┤
│                                                 │
│  📋 CENÁRIO                                     │
│  ┌───────────────────────────────────────────┐  │
│  │ "O stakeholder principal pediu uma       │  │
│  │  mudança significativa no escopo do      │  │
│  │  projeto após 60% do trabalho concluído. │  │
│  │  O prazo não pode ser alterado."         │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  Qual princípio melhor se aplica aqui?          │
│                                                 │
│  ○ Ser um administrador zeloso                 │
│  ○ Navegar na complexidade                     │
│  ● Demonstrar comportamentos de liderança      │
│  ○ Adaptar com base no contexto                │
│  ○ Focar no valor                              │
│                                                 │
│  [Confirmar Resposta]                           │
│                                                 │
│  ── APÓS RESPOSTA ──                            │
│  ✅ Correto! / ❌ Incorreto                      │
│  Explicação detalhada aqui...                  │
│  [Próximo Dilema]                              │
└─────────────────────────────────────────────────┘
```

---

### `/flashcards` — Sessão de Revisão
**Tipo:** Client Component

**Estado (Zustand — flashcard-store.ts):**
```ts
interface FlashcardStore {
  deck: Flashcard[]
  currentIndex: number
  isFlipped: boolean
  sessionStats: { easy: number; medium: number; hard: number }
  
  // Actions
  flipCard: () => void
  rateCard: (quality: 0 | 1 | 2 | 3 | 4 | 5) => void
  loadDeck: () => void
}
```

**Visual do Flashcard (flip 3D):**
```
FRENTE:                          VERSO (após click):
┌──────────────────────┐         ┌──────────────────────┐
│                      │   flip  │                      │
│   Domínio: Entrega   │ ──────► │  RESPOSTA COMPLETA   │
│                      │         │                      │
│  "O que são critérios│         │  "São os padrões     │
│   de aceitação em    │         │   acordados com o    │
│   projetos ágeis?"   │         │   cliente que definem│
│                      │         │   quando uma entrega │
│  [Clique para ver]   │         │   está completa..."  │
│                      │         │                      │
│                      │         │ [Difícil][Médio][Fácil]│
└──────────────────────┘         └──────────────────────┘
```

---

### `/models` — Mapeador de Modelos
**Tipo:** Server Component + filtros Client

**Filtros disponíveis:**
- Por Domínio (8 opções)
- Por Tipo: Análise | Planejamento | Comunicação | Estimativa | Risco | Qualidade
- Por Abordagem: Preditiva | Ágil | Híbrida
- Busca por texto livre

**Card do Modelo:**
```tsx
interface ModelCardProps {
  name: string           // ex: "Matriz de Poder/Interesse"
  type: string           // ex: "Análise"
  domains: string[]      // domínios onde se aplica
  approach: string[]     // preditiva/ágil/híbrida
  summary: string        // 1-2 linhas
  whenToUse: string      // contexto de uso
  howToUse: string       // passo a passo
  example: string        // exemplo prático
  tags: string[]
}
```

---

## Componentes Compartilhados

### `<Navigation />`
```tsx
// Barra superior com:
// - Logo/Nome
// - Links: Domínios | Simulador | Flashcards | Modelos
// - Indicador de progresso do dia (streak)
// - Toggle modo escuro
```

### `<ProgressRing />`
```tsx
// Círculo SVG animado mostrando % de conclusão
// Usado nos cards de domínio e na home
```

### `<PrincipleModal />`
```tsx
// Modal global que abre ao clicar em qualquer princípio
// Mostra: nome, descrição completa, domínios relacionados, exemplos
```

### `<ToastFeedback />`
```tsx
// Feedback rápido após resposta no simulador
// Verde (correto) ou vermelho (incorreto)
// Aparece 2s e some com animação
```

---

## Sistema de Design

### Cores dos Domínios
```ts
const DOMAIN_COLORS = {
  stakeholders: '#6366f1',   // indigo
  team:         '#8b5cf6',   // violet
  approach:     '#06b6d4',   // cyan
  planning:     '#3b82f6',   // blue
  work:         '#f59e0b',   // amber
  delivery:     '#10b981',   // emerald
  uncertainty:  '#ef4444',   // red
  measurement:  '#ec4899',   // pink
}
```

### Tipografia
```css
/* Títulos: Geist (padrão Next.js 15) */
/* Corpo: Inter */
/* Código/técnico: JetBrains Mono */
```

### Breakpoints
```ts
// Mobile-first
// sm: 640px — cards em 2 colunas
// md: 768px — sidebar aparece
// lg: 1024px — grid 4 colunas
// xl: 1280px — layout completo
```

---

## Animações (Framer Motion)

```ts
// Entrada dos DomainCards na home
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

// Flip do flashcard
const flipVariants = {
  front: { rotateY: 0 },
  back:  { rotateY: 180 }
}

// Transição entre dilemas
const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
}
```

---

## Performance

- **Server Components** para todas as páginas estáticas (Explorador, Modelos)
- **Suspense + Loading UI** para dados lentos
- **Image optimization** do Next.js para ícones e ilustrações
- **Route prefetching** automático do Next.js nos links
- **SWR / React Query** não necessário — tRPC já gerencia cache
