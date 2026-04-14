# PMBOK 7 Navigator — Índice Geral

## O que é este cofre
Documentação completa de engenharia do sistema **PMBOK 7 Navigator** — um webapp interativo para estudo e aplicação prática do Guia PMBOK® Sétima Edição.

---

## Arquivos

| Arquivo | Conteúdo |
|---------|----------|
| [[01 - Visão Geral e Conceito]] | Propósito, público-alvo, MVP, roadmap |
| [[02 - Arquitetura e Fluxo]] | Diagrama geral, camadas, decisões técnicas |
| [[03 - Frontend]] | Next.js, páginas, componentes, estado |
| [[04 - Backend e API]] | tRPC, rotas, regras de negócio |
| [[05 - Banco de Dados]] | Schema SQLite completo, Drizzle ORM, seeds |
| [[06 - Integração Obsidian]] | Como o vault alimenta os flashcards |
| [[07 - Domínios e Princípios PMBOK 7]] | Os 8 domínios e 12 princípios com detalhes |
| [[08 - Simulador de Dilemas]] | Todos os cenários, respostas e explicações |
| [[09 - Mapeador de Modelos e Métodos]] | Biblioteca de ferramentas e quando usar |
| [[10 - Flashcards]] | Template, frontmatter, algoritmo de repetição |
| [[11 - Deploy e Ambiente]] | Variáveis, Turso, Vercel, CI |
| [[12 - Decisões Técnicas]] | ADRs — por que cada tecnologia foi escolhida |

---

## Stack Resumida

```
Frontend   → Next.js 15 + TypeScript + Tailwind + shadcn/ui + Framer Motion
Estado     → Zustand
API        → tRPC v11
ORM        → Drizzle ORM
Banco      → SQLite via Turso (ou better-sqlite3 local)
Parsing MD → gray-matter + remark + unified
Deploy     → Vercel (frontend) + Turso (banco)
```

---

## Status do Projeto

- [ ] Fase 1 — Setup + Seed
- [ ] Fase 2 — Explorador de Domínios
- [ ] Fase 3 — Simulador de Dilemas
- [ ] Fase 4 — Flashcards Obsidian
- [ ] Fase 5 — Mapeador de Modelos
