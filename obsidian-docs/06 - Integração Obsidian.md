# 06 — Integração Obsidian

## Conceito
O cofre Obsidian é a **fonte da verdade** para os flashcards. Você escreve os cards em Markdown com frontmatter YAML, e o sistema web os lê, interpreta e apresenta ao usuário com repetição espaçada.

**Vantagem:** Para adicionar ou editar flashcards, basta abrir o Obsidian — sem tocar no código.

---

## Estrutura de Pastas no Cofre

```
Sara Teste/
├── Flashcards/
│   ├── Domínios/
│   │   ├── stakeholders/
│   │   │   ├── identificar-stakeholders.md
│   │   │   ├── matriz-poder-interesse.md
│   │   │   └── estrategias-engajamento.md
│   │   ├── equipe/
│   │   ├── planejamento/
│   │   ├── entrega/
│   │   ├── incerteza/
│   │   ├── medicao/
│   │   ├── trabalho/
│   │   └── abordagem/
│   └── Princípios/
│       ├── stewardship.md
│       ├── team.md
│       └── ... (12 arquivos)
├── Referência/          ← notas de estudo (não são flashcards)
└── ... (este arquivo e os demais de documentação)
```

---

## Template de Flashcard

Todo arquivo `.md` que for um flashcard **deve** ter este frontmatter e estrutura:

```markdown
---
type: flashcard
domain: stakeholders
principle: stakeholders
difficulty: medium
tags: [engajamento, identificação, stakeholder]
---

## FRENTE

Qual é a principal diferença entre **identificar** e **engajar** stakeholders no PMBOK 7?

## VERSO

**Identificar** é um ato pontual de mapear quem são as partes interessadas e seus interesses.

**Engajar** é um processo contínuo de:
- Compreender expectativas
- Comunicar proativamente
- Construir relacionamentos
- Gerenciar resistências

> No PMBOK 7, o foco mudou para o **engajamento contínuo**, não apenas identificação inicial.

**Princípio relacionado:** Engajar efetivamente as partes interessadas
```

---

## Campos do Frontmatter

| Campo | Obrigatório | Valores | Descrição |
|-------|-------------|---------|-----------|
| `type` | ✅ | `flashcard` | Identifica o arquivo como flashcard |
| `domain` | ✅ | slug do domínio | Ex: `stakeholders`, `planning`, `uncertainty` |
| `principle` | ❌ | slug do princípio | Princípio primário relacionado |
| `difficulty` | ❌ | `easy`, `medium`, `hard` | Dificuldade inicial (padrão: `medium`) |
| `tags` | ❌ | lista YAML | Palavras-chave para busca |

---

## Slugs Válidos

### Domínios
```yaml
domain: stakeholders
domain: team
domain: development-approach
domain: planning
domain: project-work
domain: delivery
domain: measurement
domain: uncertainty
```

### Princípios
```yaml
principle: stewardship
principle: team
principle: stakeholders
principle: value
principle: systems-thinking
principle: leadership
principle: tailoring
principle: quality
principle: complexity
principle: risk
principle: adaptability
principle: change
```

---

## Flashcards de Exemplo para Criar

### Domínio: Stakeholders

**Arquivo:** `Flashcards/Domínios/stakeholders/matriz-poder-interesse.md`
```markdown
---
type: flashcard
domain: stakeholders
difficulty: easy
tags: [matriz, poder, interesse, ferramenta]
---

## FRENTE

Quais são as 4 estratégias da Matriz de Poder/Interesse?

## VERSO

| Quadrante | Estratégia |
|-----------|-----------|
| Alto Poder + Alto Interesse | **Gerenciar de perto** |
| Alto Poder + Baixo Interesse | **Manter satisfeito** |
| Baixo Poder + Alto Interesse | **Manter informado** |
| Baixo Poder + Baixo Interesse | **Monitorar** |
```

---

**Arquivo:** `Flashcards/Domínios/stakeholders/definicao-stakeholder.md`
```markdown
---
type: flashcard
domain: stakeholders
difficulty: easy
tags: [definição, stakeholder, conceito]
---

## FRENTE

O que é uma **parte interessada** segundo o PMBOK 7?

## VERSO

Um **indivíduo, grupo ou organização** que pode **afetar**, ser **afetado** ou **perceber-se afetado** por uma decisão, atividade ou resultado do projeto.

**Tipos:**
- Internos: equipe, patrocinador, PMO
- Externos: clientes, fornecedores, comunidade, reguladores
```

---

### Domínio: Incerteza

**Arquivo:** `Flashcards/Domínios/incerteza/tipos-de-risco.md`
```markdown
---
type: flashcard
domain: uncertainty
principle: risk
difficulty: medium
tags: [risco, ameaça, oportunidade, incerteza]
---

## FRENTE

Qual a diferença entre **risco**, **ameaça** e **oportunidade** no PMBOK 7?

## VERSO

**Risco** = evento incerto com impacto (positivo ou negativo) nos objetivos do projeto.

**Ameaça** = risco com impacto **negativo**
- Respostas: evitar, transferir, mitigar, aceitar

**Oportunidade** = risco com impacto **positivo**  
- Respostas: explorar, compartilhar, melhorar, aceitar

> O PMBOK 7 enfatiza que **oportunidades também devem ser gerenciadas ativamente**.
```

---

### Princípios

**Arquivo:** `Flashcards/Princípios/value.md`
```markdown
---
type: flashcard
domain: delivery
principle: value
difficulty: medium
tags: [valor, resultado, negócio, princípio]
---

## FRENTE

Por que o princípio "Focar no Valor" é mais amplo do que apenas "entregar no prazo e custo"?

## VERSO

Entregar no prazo e custo é **eficiência**. O princípio "Focar no Valor" é sobre **eficácia**.

**Valor** no PMBOK 7 inclui:
- Benefícios para o negócio (ROI, receita, redução de custos)
- Satisfação do cliente/usuário
- Impacto social ou ambiental
- Aprendizado organizacional

**Consequência prática:** Um projeto entregue no prazo que ninguém usa é um **fracasso** pelo PMBOK 7.
```

---

## Como o Sistema Web Lê os Cards

```
1. Ambiente define: OBSIDIAN_VAULT_PATH=/caminho/para/Sara Teste
2. tRPC: flashcards.getDueCards() é chamado
3. obsidian-parser.ts:
   a. Lista recursivamente todos os .md
   b. Lê frontmatter com gray-matter
   c. Filtra apenas type: flashcard
   d. Extrai seções ## FRENTE e ## VERSO
   e. Renderiza VERSO como HTML (remark)
   f. Gera ID determinístico do path
4. Cruza com flashcard_progress no SQLite
5. Retorna cards com next_review <= hoje
```

---

## Dicas para Escrever Bons Flashcards

1. **Uma pergunta por card** — não tente cobrir tudo num único card
2. **Frente = pergunta clara** — evite ambiguidades
3. **Verso = resposta completa** — use markdown: tabelas, listas, negrito
4. **Máximo 5 linhas no verso** — se precisar mais, divida em dois cards
5. **Use o campo `difficulty`** — easy para definições, hard para aplicação
6. **Tags descritivas** — facilitam busca futura
7. **Exemplos práticos** — cards com exemplos são lembrados melhor
