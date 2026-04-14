# 09 — Mapeador de Modelos e Métodos

## O que é
Biblioteca interativa de ferramentas, modelos e métodos do PMBOK 7. Filtrável por domínio, tipo e abordagem.

---

## Tipos de Ferramenta

| Tipo | Código | Descrição |
|------|--------|-----------|
| Análise | `analysis` | Avaliação de situações e diagnóstico |
| Planejamento | `planning` | Organização e estruturação de trabalho |
| Comunicação | `communication` | Troca e gestão de informações |
| Estimativa | `estimation` | Previsão de esforço, custo, prazo |
| Risco | `risk` | Identificação e resposta a incertezas |
| Qualidade | `quality` | Garantia e controle de qualidade |

---

## Catálogo Completo (30+ ferramentas)

---

### ANÁLISE DE STAKEHOLDERS

**Matriz de Poder/Interesse**
- Tipo: `analysis` | Domínios: Stakeholders | Abordagem: Todas
- O que é: Grid 2×2 que posiciona stakeholders por nível de poder e interesse no projeto
- Quando usar: Início do projeto e ao identificar novos stakeholders
- Como usar: Mapeie → Avalie Poder (1-5) → Avalie Interesse (1-5) → Plote → Defina estratégia por quadrante
- Estratégias: Gerenciar de perto | Manter satisfeito | Manter informado | Monitorar
- Exemplo prático: Diretora financeira: poder 5, interesse 2 → Manter satisfeita com relatório executivo mensal

---

**Análise de Stakeholders (Avançada)**
- Tipo: `analysis` | Domínios: Stakeholders | Abordagem: Todas
- O que é: Análise detalhada incluindo atitudes (apoiador/neutro/resistente), impacto e estratégia
- Quando usar: Projetos com muitos stakeholders ou alta resistência esperada
- Como usar: Liste todos → Categorize (interno/externo) → Avalie posição atual vs. desejada → Planeje engajamento
- Exemplo prático: Stakeholder "resistente" com alto poder → Reuniões 1:1 para entender objeções antes de apresentações em grupo

---

### ANÁLISE DE RISCOS

**Registro de Riscos**
- Tipo: `risk` | Domínios: Incerteza, Planejamento | Abordagem: Todas
- O que é: Documento vivo com todos os riscos identificados, suas características e respostas planejadas
- Quando usar: Desde o início, atualizado continuamente (pelo menos a cada sprint/fase)
- Como usar: Identifique → Analise (P×I) → Classifique → Responda → Monitore → Encerre
- Campos: ID, Descrição, Categoria, Probabilidade, Impacto, Score, Resposta, Dono, Status
- Exemplo prático: Risco de fornecedor único → Identificar alternativa (mitigação) + reserva de contingência (aceitação ativa)

---

**Matriz de Probabilidade e Impacto**
- Tipo: `risk` | Domínios: Incerteza | Abordagem: Preditiva, Híbrida
- O que é: Grid que classifica riscos por probabilidade e impacto para priorização
- Quando usar: Ao analisar riscos identificados para priorizar esforço de resposta
- Como usar: Defina escala → Avalie cada risco → Priorize vermelho (alto P×I) → Planeje respostas proporcionais
- Exemplo prático: Risco regulatório: P=Baixo, I=Alto → Monitorar + plano de contingência pronto

---

**Análise SWOT de Projeto**
- Tipo: `analysis` | Domínios: Planejamento, Incerteza | Abordagem: Todas
- O que é: Análise de Forças, Fraquezas, Oportunidades e Ameaças do projeto
- Quando usar: Fase de iniciação e revisões estratégicas
- Como usar: Workshop com equipe e stakeholders → Preencha os 4 quadrantes → Derive estratégias (SO, ST, WO, WT)
- Exemplo prático: Força: equipe experiente + Oportunidade: tecnologia nova → Estratégia: investir em prova de conceito

---

### PLANEJAMENTO

**Estrutura Analítica do Projeto (EAP/WBS)**
- Tipo: `planning` | Domínios: Planejamento, Entrega | Abordagem: Preditiva, Híbrida
- O que é: Decomposição hierárquica do escopo total do projeto em pacotes de trabalho menores
- Quando usar: Planejamento inicial do escopo em projetos preditivos
- Como usar: Parta do objetivo → Decomponha em entregas → Decomponha em pacotes de trabalho → Estime cada pacote
- Regra: Cada pacote deve ter 8-80 horas de trabalho (regra geral)
- Exemplo prático: Entrega "módulo de pagamento" → Pacotes: design, desenvolvimento, testes, integração, documentação

---

**Roadmap de Produto**
- Tipo: `planning` | Domínios: Planejamento, Entrega | Abordagem: Ágil, Híbrida
- O que é: Visão de alto nível da evolução do produto ao longo do tempo com temas e épicos
- Quando usar: Projetos ágeis ou de produto para comunicar direção sem comprometer detalhes
- Como usar: Defina visão → Identifique temas estratégicos → Ordene por valor → Defina horizonte temporal (Now/Next/Later)
- Exemplo prático: Now: autenticação | Next: dashboard | Later: integrações — sem datas rígidas, com valores relativos

---

**Diagrama de Rede (PERT/CPM)**
- Tipo: `planning` | Domínios: Planejamento | Abordagem: Preditiva
- O que é: Representação visual das dependências entre atividades e identificação do Caminho Crítico
- Quando usar: Projetos com muitas dependências onde atrasos no crítico impactam o prazo total
- Como usar: Liste atividades → Defina dependências → Estime duração → Calcule cedo/tarde → Identifique caminho crítico (folga zero)
- Exemplo prático: Atividade de aprovação regulatória está no caminho crítico → qualquer atraso atrasa o projeto inteiro

---

### ESTIMATIVA

**Planning Poker**
- Tipo: `estimation` | Domínios: Planejamento, Trabalho | Abordagem: Ágil, Híbrida
- O que é: Técnica de estimativa colaborativa usando cartas com sequência Fibonacci
- Quando usar: Estimativa de user stories ou tarefas em equipes ágeis
- Como usar: Apresente item → Cada membro escolhe carta sem revelar → Todos revelam simultaneamente → Discuta divergências → Reestime
- Exemplo prático: Divergência grande (1 vs. 13) → Membro com 13 explica complexidade técnica que outros não viram

---

**Estimativa por Três Pontos (PERT)**
- Tipo: `estimation` | Domínios: Planejamento | Abordagem: Preditiva, Híbrida
- O que é: Estimativa que considera cenário otimista, pessimista e mais provável
- Fórmula: E = (O + 4M + P) / 6 | Desvio padrão: σ = (P - O) / 6
- Quando usar: Atividades com alta incerteza na estimativa
- Como usar: Estime O (melhor caso), M (mais provável), P (pior caso) → Calcule E e σ → Use para buffer
- Exemplo prático: O=3d, M=5d, P=15d → E=6d, σ=2d → Planeje 8 dias com confiança de ~84%

---

**Story Points e Velocidade**
- Tipo: `estimation` | Domínios: Planejamento, Medição | Abordagem: Ágil
- O que é: Unidade relativa de esforço; velocidade = story points entregues por sprint
- Quando usar: Planejamento de sprints e previsão de releases em times ágeis
- Como usar: Calibre com histórias de referência → Estime backlog → Meça velocidade real por 3+ sprints → Use média para previsão
- Exemplo prático: Velocidade média de 40 SP/sprint × backlog de 200 SP = ~5 sprints até o release

---

### QUALIDADE

**Critérios de Aceitação**
- Tipo: `quality` | Domínios: Entrega, Planejamento | Abordagem: Todas
- O que é: Condições específicas e mensuráveis que uma entrega deve satisfazer para ser aceita
- Quando usar: Antes de iniciar qualquer trabalho de desenvolvimento
- Como usar: Para cada entrega: "A entrega é aceita quando [condição mensurável]" → Valide com stakeholder → Use como checklist na entrega
- Exemplo prático: Feature de login aceita quando: usuário consegue logar em <3s, mensagem de erro é clara, funciona em mobile

---

**Retrospectiva**
- Tipo: `quality` | Domínios: Equipe, Trabalho | Abordagem: Ágil, Híbrida
- O que é: Cerimônia estruturada de reflexão sobre processo e identificação de melhorias
- Quando usar: Ao final de cada sprint/iteração ou fase
- Formatos: Start/Stop/Continue | 4Ls (Liked/Learned/Lacked/Longed For) | Mad/Sad/Glad
- Como usar: 1h para time de até 8 → Gere insights → Priorize 1-3 ações → Atribua responsáveis → Revise na próxima retro
- Exemplo prático: Ação da retro: "Criar checklist de dependências antes do sprint" → mede na retro seguinte se resolveu

---

**Diagrama de Causa e Efeito (Ishikawa)**
- Tipo: `quality` | Domínios: Entrega, Trabalho | Abordagem: Todas
- O que é: Diagrama espinha de peixe para identificar causas raiz de um problema
- Quando usar: Quando um defeito ou problema se repete e a causa raiz não é óbvia
- Como usar: Defina o efeito (problema) → Identifique categorias de causa (6M: Mão de obra, Método, Máquina, Material, Medição, Meio) → Brainstorme causas → Investigue com dados
- Exemplo prático: Problema "entregas atrasadas" → Causa raiz: dependências não mapeadas no planejamento → Ação: checklist de dependências

---

### COMUNICAÇÃO

**Plano de Comunicação**
- Tipo: `communication` | Domínios: Stakeholders, Trabalho | Abordagem: Todas
- O que é: Documento que define quem precisa de qual informação, quando e como
- Quando usar: Início do projeto, revisado conforme stakeholders mudam
- Colunas: Stakeholder | Informação | Frequência | Canal | Responsável | Formato
- Exemplo prático: Patrocinador recebe: status executivo, quinzenal, email, 1 página, gerente de projeto

---

**Ata de Reunião Estruturada**
- Tipo: `communication` | Domínios: Trabalho | Abordagem: Todas
- O que é: Registro padronizado de decisões, ações e participantes de reuniões
- Quando usar: Toda reunião de projeto relevante
- Campos obrigatórios: Data, participantes, pauta, decisões tomadas, ações (o quê, quem, quando)
- Exemplo prático: Decisão documentada previne "não foi isso que decidimos" 3 semanas depois

---

### DESENVOLVIMENTO ÁGIL

**Kanban Board**
- Tipo: `planning` | Domínios: Trabalho, Entrega | Abordagem: Ágil, Híbrida
- O que é: Visualização do fluxo de trabalho em colunas (A fazer / Em progresso / Feito)
- Quando usar: Equipes que precisam visualizar e limitar trabalho em progresso (WIP)
- Como usar: Defina colunas → Defina limites WIP por coluna → Mova cards → Identifique gargalos (coluna acumulando)
- WIP Limits: Coluna com mais de X cards = gargalo a resolver
- Exemplo prático: Coluna "Revisão" com 8 itens (WIP=3) → gargalo: precisa de mais revisores ou menos entradas

---

**User Story Mapping**
- Tipo: `planning` | Domínios: Planejamento, Entrega | Abordagem: Ágil, Híbrida
- O que é: Técnica visual que organiza user stories pela jornada do usuário, facilitando priorização
- Quando usar: Construção e priorização de backlog de produto
- Como usar: Mapeie atividades do usuário (eixo X) → Detalhe tasks por atividade (eixo Y) → Faça cortes horizontais por release
- Exemplo prático: Release 1: apenas o caminho feliz | Release 2: casos de erro | Release 3: personalização

---

**Definition of Done (DoD)**
- Tipo: `quality` | Domínios: Entrega, Equipe | Abordagem: Ágil, Híbrida
- O que é: Critérios compartilhados que toda entrega deve satisfazer para ser considerada completa
- Quando usar: Definir no início do projeto, revisar nas retrospectivas
- Itens típicos: Código revisado, testes escritos e passando, documentação atualizada, deploy em staging, aprovado por PO
- Exemplo prático: Sem DoD claro, "feito" significa coisas diferentes para cada pessoa

---

### LIDERANÇA E EQUIPE

**RACI Matrix**
- Tipo: `planning` | Domínios: Equipe, Trabalho | Abordagem: Todas
- O que é: Matriz que define papéis nas decisões/entregas: Responsável, Aprovador, Consultado, Informado
- Quando usar: Projetos com múltiplos stakeholders envolvidos nas mesmas entregas
- Como usar: Liste entregas/decisões (linhas) × Liste pessoas/funções (colunas) → Atribua R/A/C/I → Valide: cada linha tem 1 A e 1+ R
- Regra: Apenas 1 Aprovador por entrega; múltiplos Aprovadores = nenhum Aprovador
- Exemplo prático: Aprovação de requisitos: A=Gerente de Produto, R=Analista, C=Tech Lead, I=Equipe Dev

---

**Avaliação de Estilos de Liderança Situacional**
- Tipo: `analysis` | Domínios: Equipe | Abordagem: Todas
- O que é: Framework para adaptar estilo de liderança ao nível de desenvolvimento do colaborador
- Estilos: Dirigir (S1) → Treinar (S2) → Apoiar (S3) → Delegar (S4)
- Quando usar: Ao alocar tarefas ou desenvolver membros da equipe
- Como usar: Avalie competência + comprometimento do membro → Escolha estilo → Ajuste conforme evolui
- Exemplo prático: Desenvolvedor júnior em tarefa nova → S1/S2 (diretivo + explicativo) | Sênior experiente → S4 (delegar + confiar)

---

## Filtros Disponíveis na Interface

```
Por Domínio: [Todos] [Stakeholders] [Equipe] [Abordagem] [Planejamento] 
             [Trabalho] [Entrega] [Medição] [Incerteza]

Por Tipo:    [Todos] [Análise] [Planejamento] [Comunicação] 
             [Estimativa] [Risco] [Qualidade]

Por Abordagem: [Todas] [Preditiva] [Ágil] [Híbrida]

Busca: [campo de texto livre]
```

---

## Ferramenta Certa para o Cenário

| Situação | Ferramenta Recomendada |
|---------|----------------------|
| Início do projeto, muitos stakeholders | Matriz de Poder/Interesse |
| Requisitos incertos, entregas frequentes | User Story Mapping + Kanban |
| Prazo fixo, escopo claro, muitas dependências | WBS + Diagrama de Rede/CPM |
| Equipe nova, expectativas confusas | RACI + Definition of Done |
| Projeto repetindo os mesmos erros | Retrospectiva + Ishikawa |
| Alta incerteza técnica, tecnologia nova | Registro de Riscos + Estimativa 3 Pontos |
| Baixa adoção após entrega | Gestão da Mudança + Plano de Comunicação |
| Conflito na equipe sobre decisões técnicas | RACI (clareza de papéis) + Retrospectiva |
