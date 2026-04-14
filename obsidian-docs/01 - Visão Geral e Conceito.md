# 01 — Visão Geral e Conceito

## Problema que Resolve
O PMBOK 7 mudou radicalmente: saiu de processos prescritivos para princípios e domínios. A maioria dos materiais de estudo ainda apresenta o conteúdo de forma passiva (texto corrido, PDFs longos). O **PMBOK 7 Navigator** transforma esse conteúdo em experiência interativa e prática.

---

## Público-Alvo
- Candidatos à certificação PMP
- Gerentes de projeto em transição do PMBOK 6 para o 7
- Times ágeis que querem embasar suas práticas no PMBOK 7
- Estudantes de gestão de projetos

---

## Proposta de Valor
> "Não leia o PMBOK. Navegue nele."

Em vez de ler 370 páginas, o usuário:
1. **Explora** domínios visualmente
2. **Testa** seus conhecimentos em dilemas reais
3. **Revisa** flashcards no momento certo (spaced repetition)
4. **Consulta** modelos e ferramentas quando precisa delas

---

## As 4 Funcionalidades do MVP

### 1. Explorador de Domínios
- 8 cards visuais, um por domínio
- Ao clicar: atividades principais, resultados esperados, conexão com os 12 princípios
- Indicador visual de quais princípios se aplicam a cada domínio

### 2. Simulador de Dilemas
- O sistema apresenta um cenário de projeto realista
- O usuário escolhe qual dos 12 princípios melhor se aplica
- Feedback imediato com explicação detalhada
- Pontuação e histórico de acertos

### 3. Flashcards Inteligentes
- Cards escritos no Obsidian (este cofre) em Markdown
- Puxados pelo webapp via leitura dos arquivos `.md`
- Algoritmo SM-2 (base do Anki) para repetição espaçada
- Progresso salvo no SQLite

### 4. Mapeador de Modelos e Métodos
- Biblioteca de +30 ferramentas do PMBOK 7
- Filtros: por domínio, por tipo (análise/planejamento/comunicação), por abordagem (preditiva/ágil/híbrida)
- Card de cada ferramenta: o que é, quando usar, como usar, exemplo prático

---

## Roadmap

### Fase 1 — Fundação (Semana 1)
- Setup do projeto Next.js 15
- Configuração Drizzle + SQLite/Turso
- Seed completo: domínios, princípios, relações
- Layout base + navegação

### Fase 2 — Explorador (Semana 2)
- Página home com 8 cards de domínio
- Página de detalhe do domínio
- Conexão visual domínio ↔ princípios

### Fase 3 — Simulador (Semana 3)
- Engine de dilemas
- 20+ cenários seedados
- Sistema de pontuação e feedback

### Fase 4 — Flashcards (Semana 4)
- Parser de `.md` do Obsidian
- Interface de revisão (flip card)
- Algoritmo SM-2 integrado ao SQLite

### Fase 5 — Mapeador (Semana 5)
- Biblioteca de modelos
- Sistema de filtros
- Cards detalhados de cada ferramenta

### Fase 6 — Polish (Semana 6)
- Modo escuro
- PWA (offline-first)
- Exportar progresso
- Auth simples (opcional)

---

## Métricas de Sucesso do MVP
- Usuário consegue navegar todos os 8 domínios em menos de 5 min
- Taxa de acerto no simulador sobe após 3 sessões de revisão
- Todos os 12 princípios têm pelo menos 5 flashcards cada
- Biblioteca tem pelo menos 20 modelos catalogados
