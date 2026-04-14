# 10 — Flashcards

## Algoritmo SM-2 (Spaced Repetition)

### Como Funciona
O SM-2 é o algoritmo base do Anki. Cada vez que você avalia um card, o sistema calcula quando você deve revê-lo novamente.

### Escala de Avaliação (0-5)
| Nota | Significado | Consequência |
|------|-------------|-------------|
| 0 | Blackout — não lembrei nada | Reinicia (intervalo = 1 dia) |
| 1 | Lembrei errado | Reinicia |
| 2 | Lembrei com muita dificuldade | Reinicia |
| 3 | Lembrei com dificuldade | Progride (intervalo aumenta, fator reduz) |
| 4 | Lembrei com hesitação | Progride normalmente |
| 5 | Lembrei perfeitamente | Progride com bônus |

### Interface Simplificada (3 botões)
Para o usuário final, os 6 níveis viram 3 botões:
- **Difícil** → quality = 2
- **Médio** → quality = 4  
- **Fácil** → quality = 5

### Progressão dos Intervalos
```
1ª revisão:  1 dia depois
2ª revisão:  6 dias depois
3ª revisão:  intervalo × easiness (padrão 2.5)
4ª revisão:  intervalo anterior × easiness
...
```

Exemplo com quality=5 sempre:
- Revisão 1: 1 dia
- Revisão 2: 6 dias
- Revisão 3: 15 dias
- Revisão 4: 37 dias
- Revisão 5: 93 dias

---

## Estrutura de Pastas dos Flashcards

```
Flashcards/
├── Domínios/
│   ├── stakeholders/
│   ├── equipe/
│   ├── abordagem/
│   ├── planejamento/
│   ├── trabalho/
│   ├── entrega/
│   ├── medicao/
│   └── incerteza/
└── Princípios/
    ├── 01-stewardship.md
    ├── 02-team.md
    ├── 03-stakeholders.md
    ├── 04-value.md
    ├── 05-systems-thinking.md
    ├── 06-leadership.md
    ├── 07-tailoring.md
    ├── 08-quality.md
    ├── 09-complexity.md
    ├── 10-risk.md
    ├── 11-adaptability.md
    └── 12-change.md
```

---

## Template Oficial

```markdown
---
type: flashcard
domain: [slug do domínio]
principle: [slug do princípio — opcional]
difficulty: [easy | medium | hard]
tags: [tag1, tag2, tag3]
---

## FRENTE

[Pergunta clara e objetiva. Uma coisa por card.]

## VERSO

[Resposta completa. Use markdown: listas, negrito, tabelas.]

[Máximo 5-7 linhas. Se precisar de mais, divida em 2 cards.]
```

---

## Cards Prontos para Criar

### Stakeholders (pasta: Flashcards/Domínios/stakeholders/)

---
**Arquivo:** `o-que-sao-stakeholders.md`
```markdown
---
type: flashcard
domain: stakeholders
difficulty: easy
tags: [definição, stakeholder, conceito básico]
---

## FRENTE

Qual a definição de **parte interessada** no PMBOK 7?

## VERSO

Indivíduo, grupo ou organização que pode **afetar**, ser **afetado** ou **perceber-se afetado** por uma decisão, atividade ou resultado do projeto.

**Categorias:**
- **Internos:** equipe, patrocinador, PMO, outros departamentos
- **Externos:** clientes, usuários finais, fornecedores, comunidade, reguladores
```

---
**Arquivo:** `engajamento-vs-identificacao.md`
```markdown
---
type: flashcard
domain: stakeholders
difficulty: medium
tags: [engajamento, identificação, diferença]
---

## FRENTE

Qual a diferença entre **identificar** e **engajar** stakeholders?

## VERSO

**Identificar** = ato pontual de mapear quem são as partes interessadas

**Engajar** = processo **contínuo** de:
- Compreender expectativas
- Comunicar proativamente  
- Construir relacionamentos
- Gerenciar resistências e conflitos

> PMBOK 7 enfatiza engajamento contínuo, não apenas identificação inicial
```

---

### Princípios (pasta: Flashcards/Princípios/)

---
**Arquivo:** `04-value.md`
```markdown
---
type: flashcard
domain: delivery
principle: value
difficulty: medium
tags: [valor, resultado, sucesso do projeto]
---

## FRENTE

Por que entregar "no prazo e custo" pode ainda ser uma **falha** segundo o PMBOK 7?

## VERSO

Porque o PMBOK 7 mede sucesso pelo **valor gerado**, não pela eficiência da entrega.

**Projeto "bem-sucedido" que falha:**
- Entregou no prazo ✓
- Dentro do orçamento ✓
- Ninguém usa o resultado ✗
- Não gerou os benefícios esperados ✗

**Princípio:** Focar no valor significa medir benefícios, não apenas outputs.
```

---
**Arquivo:** `09-complexity.md`
```markdown
---
type: flashcard
domain: uncertainty
principle: complexity
difficulty: hard
tags: [complexidade, complicado, cynefin, abordagem]
---

## FRENTE

Qual a diferença entre um sistema **complicado** e um sistema **complexo**?

## VERSO

**Complicado** = difícil, mas tem solução conhecida (expert resolve)
- Exemplo: motor de avião — difícil, mas previsível

**Complexo** = comportamento emergente, causa-efeito não é óbvio
- Exemplo: stakeholders humanos, inovação, transformação organizacional

**Implicação para projetos:**
- Complicado → planejamento detalhado funciona
- Complexo → iterações curtas e experimentos funcionam melhor

> PMBOK 7 reconhece que a maioria dos projetos hoje tem elementos complexos
```

---

### Incerteza (pasta: Flashcards/Domínios/incerteza/)

---
**Arquivo:** `respostas-ameacas.md`
```markdown
---
type: flashcard
domain: uncertainty
principle: risk
difficulty: medium
tags: [risco, ameaça, resposta, estratégia]
---

## FRENTE

Quais são as 4 estratégias de resposta a **ameaças** (riscos negativos)?

## VERSO

| Estratégia | Quando usar | Exemplo |
|-----------|-------------|---------|
| **Evitar** | Alto impacto, pode eliminar | Mudar escopo para não usar tecnologia arriscada |
| **Transferir** | Pode repassar o impacto | Contratar seguro ou fornecedor com garantia |
| **Mitigar** | Reduzir P ou I | Criar fornecedor alternativo (backup) |
| **Aceitar** | Baixo P×I ou sem alternativa | Monitorar e ter plano de contingência |
```

---
**Arquivo:** `respostas-oportunidades.md`
```markdown
---
type: flashcard
domain: uncertainty
principle: risk
difficulty: medium
tags: [risco, oportunidade, resposta, estratégia]
---

## FRENTE

Quais são as 4 estratégias de resposta a **oportunidades** (riscos positivos)?

## VERSO

| Estratégia | O que faz | Exemplo |
|-----------|-----------|---------|
| **Explorar** | Garantir que aconteça | Alocar os melhores recursos para aproveitar |
| **Melhorar** | Aumentar probabilidade/impacto | Investir para maximizar o ganho |
| **Compartilhar** | Parceria para capturar juntos | Joint venture com empresa complementar |
| **Aceitar** | Aproveitar se ocorrer | Não agir agora, mas capturar se surgir |
```

---

## Metas de Cards por Área

| Área | Meta de Cards |
|------|--------------|
| Stakeholders | 15 cards |
| Equipe | 10 cards |
| Abordagem | 10 cards |
| Planejamento | 15 cards |
| Trabalho | 10 cards |
| Entrega | 15 cards |
| Medição | 10 cards |
| Incerteza | 15 cards |
| Princípios (12 × 2) | 24 cards |
| **Total MVP** | **~124 cards** |

---

## Sessão de Revisão — Como Usar

1. Abrir `/flashcards` no webapp
2. Sistema carrega cards vencidos hoje (SM-2)
3. Para cada card:
   - Leia a FRENTE
   - Tente responder mentalmente
   - Clique para revelar o VERSO
   - Avalie: Difícil / Médio / Fácil
4. Sistema salva e recalcula próxima revisão
5. Sessão termina quando não há mais cards vencidos

**Recomendação:** Sessões de 15-20 minutos por dia são mais eficazes que uma sessão longa semanal.
