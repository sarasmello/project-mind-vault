# 08 — Simulador de Dilemas

## Como Funciona
- Sistema apresenta um **cenário realista** de projeto
- Usuário escolhe entre **5 princípios** (1 correto + 4 distratores plausíveis)
- Após resposta: **feedback imediato** com explicação e dica
- **Pontuação** acumulada por sessão
- Histórico salvo no SQLite

---

## Estrutura de um Dilema (no banco)

```ts
{
  id: string
  domainId: string           // domínio principal do cenário
  scenario: string           // o problema (2-4 frases)
  context: string            // contexto adicional (opcional)
  correctPrincipleId: string // slug do princípio correto
  explanation: string        // por que esse princípio
  tip: string                // dica extra para memorizar
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]          // JSON: 5 slugs de princípios
}
```

---

## 25 Dilemas para o Seed

### FÁCEIS (8)

---

**Dilema 1**
- **Domínio:** Stakeholders
- **Cenário:** Você acabou de ser designado gerente de um projeto de transformação digital. Há 15 departamentos que serão impactados, mas você ainda não conversou com nenhum deles.
- **Correto:** `stakeholders` (Engajar efetivamente as partes interessadas)
- **Explicação:** O primeiro passo crítico é identificar e mapear todas as partes interessadas. Deixar stakeholders sem mapeamento no início cria resistência e surpresas ao longo do projeto.
- **Dica:** Stakeholders não identificados se tornam surpresas desagradáveis. Mapeie cedo, mapeie todos.
- **Opções:** stakeholders, team, planning, value, change

---

**Dilema 2**
- **Domínio:** Equipe
- **Cenário:** Dois desenvolvedores sênior da equipe estão em conflito sobre a arquitetura técnica. As discussões estão atrasando decisões e afetando o ambiente de trabalho.
- **Correto:** `team` (Criar ambiente colaborativo de equipe)
- **Explicação:** Conflitos não resolvidos destroem a colaboração. O gerente deve facilitar uma resolução construtiva, não ignorar ou tomar partido automaticamente.
- **Dica:** Conflito técnico bem resolvido fortalece o time. Conflito ignorado o destrói.
- **Opções:** team, leadership, complexity, stakeholders, quality

---

**Dilema 3**
- **Domínio:** Entrega
- **Cenário:** O cliente aprova cada entrega parcial rapidamente, mas na validação final diz que "não era isso que queria".
- **Correto:** `value` (Focar no valor)
- **Explicação:** Aprovações formais sem alinhamento de valor real levam a entregas tecnicamente corretas, mas inúteis. É preciso garantir que cada aprovação conecta com os benefícios esperados.
- **Dica:** Entrega aprovada ≠ valor entregue. Sempre conecte aprovações ao resultado de negócio.
- **Opções:** value, quality, stakeholders, adaptability, change

---

**Dilema 4**
- **Domínio:** Incerteza
- **Cenário:** Um fornecedor crítico do projeto está enfrentando problemas financeiros sérios, mas o gerente decide não registrar isso como risco "para não preocupar o patrocinador".
- **Correto:** `stewardship` (Ser um administrador zeloso, confiável e ético)
- **Explicação:** Omitir riscos conhecidos viola o dever ético do gerente de projeto. O patrocinador precisa de informações completas para tomar decisões.
- **Dica:** Má notícia tardia é sempre pior que má notícia antecipada.
- **Opções:** stewardship, risk, leadership, quality, stakeholders

---

**Dilema 5**
- **Domínio:** Planejamento
- **Cenário:** O projeto tem prazo agressivo. O gerente propõe remover as etapas de teste de qualidade para ganhar tempo.
- **Correto:** `quality` (Incorporar qualidade nos processos e entregas)
- **Explicação:** Cortar qualidade economiza tempo no curto prazo, mas causa retrabalho e defeitos em produção. Qualidade precisa ser integrada, não removida sob pressão.
- **Dica:** Qualidade pulada no desenvolvimento vira bug em produção — o custo multiplica.
- **Opções:** quality, adaptability, tailoring, risk, value

---

**Dilema 6**
- **Domínio:** Equipe
- **Cenário:** O gerente de projeto microgerencia cada tarefa da equipe, verificando o trabalho a cada hora e revertendo decisões técnicas dos desenvolvedores.
- **Correto:** `leadership` (Demonstrar comportamentos de liderança)
- **Explicação:** Liderança eficaz adapta o estilo ao nível de maturidade da equipe. Microgestão em equipes competentes destrói motivação e autonomia.
- **Dica:** Líder que não delega não é líder — é gargalo.
- **Opções:** leadership, team, tailoring, stewardship, adaptability

---

**Dilema 7**
- **Domínio:** Abordagem
- **Cenário:** Uma startup quer usar o mesmo processo completo de gerenciamento de projetos de uma multinacional para um projeto de 2 semanas com 3 pessoas.
- **Correto:** `tailoring` (Adaptar com base no contexto)
- **Explicação:** Processos devem ser proporcionais ao tamanho, risco e complexidade do projeto. Aplicar processo pesado em projeto simples é desperdício.
- **Dica:** O melhor processo é o mais simples que funciona para o contexto.
- **Opções:** tailoring, adaptability, complexity, planning, quality

---

**Dilema 8**
- **Domínio:** Medição
- **Cenário:** O relatório de status do projeto sempre mostra "Verde" mesmo quando há problemas sérios, porque o gerente não quer parecer incompetente.
- **Correto:** `stewardship` (Ser um administrador zeloso, confiável e ético)
- **Explicação:** Relatórios falsos prejudicam a tomada de decisão organizacional. Transparência é responsabilidade fundamental do gerente.
- **Dica:** Um projeto "verde" que falha é pior que um projeto "amarelo" que é salvo.
- **Opções:** stewardship, value, leadership, stakeholders, measurement

---

### MÉDIOS (10)

---

**Dilema 9**
- **Domínio:** Incerteza
- **Cenário:** O stakeholder principal mudou de ideia sobre o escopo principal do projeto após 60% do trabalho estar concluído. O prazo não pode ser alterado.
- **Correto:** `adaptability` (Abraçar adaptabilidade e resiliência)
- **Explicação:** Mudanças de escopo são parte da realidade de projetos. A resposta não é resistir, mas absorver a mudança de forma planejada, negociando o que é viável dentro das restrições.
- **Dica:** Resiliência não é aceitar tudo — é absorver mudanças sem quebrar o projeto.
- **Opções:** adaptability, change, risk, tailoring, stakeholders

---

**Dilema 10**
- **Domínio:** Entrega
- **Cenário:** A equipe está entregando funcionalidades tecnicamente perfeitas, mas os usuários finais não conseguem usar o sistema por ser muito complexo.
- **Correto:** `value` (Focar no valor)
- **Explicação:** Excelência técnica sem usabilidade não entrega valor. O sucesso deve ser medido pela adoção e benefícios gerados, não pela sofisticação técnica.
- **Dica:** Valor é definido por quem usa, não por quem constrói.
- **Opções:** value, quality, change, stakeholders, delivery

---

**Dilema 11**
- **Domínio:** Planejamento
- **Cenário:** Durante o planejamento, a equipe identifica que uma decisão de arquitetura pode impactar outros 3 sistemas corporativos que não estão no escopo.
- **Correto:** `systems-thinking` (Reconhecer, avaliar e responder às interações do sistema)
- **Explicação:** Projetos fazem parte de ecossistemas maiores. Ignorar os impactos em sistemas adjacentes cria problemas maiores que o projeto tentou resolver.
- **Dica:** Toda decisão técnica tem eco no sistema. Considere os ripples antes de jogar a pedra.
- **Opções:** systems-thinking, risk, planning, complexity, stewardship

---

**Dilema 12**
- **Domínio:** Equipe
- **Cenário:** A equipe está trabalhando bem, mas um membro sênior está monopolizando todas as decisões técnicas, impedindo o desenvolvimento dos juniores.
- **Correto:** `team` (Criar ambiente colaborativo de equipe)
- **Explicação:** Equipes de alto desempenho distribuem responsabilidade e desenvolvem membros. Dependência de uma pessoa cria fragilidade e desmotivação.
- **Dica:** Equipe forte > estrela solitária. Sempre.
- **Opções:** team, leadership, adaptability, stewardship, quality

---

**Dilema 13**
- **Domínio:** Incerteza
- **Cenário:** Um novo regulamento governamental pode entrar em vigor durante o projeto e mudar os requisitos completamente. A probabilidade é incerta, mas o impacto seria alto.
- **Correto:** `risk` (Otimizar respostas a riscos)
- **Explicação:** Mesmo riscos com probabilidade incerta e alto impacto precisam de resposta planejada. A análise de cenários e planos de contingência são essenciais aqui.
- **Dica:** "Probabilidade incerta" não é desculpa para ignorar risco de alto impacto.
- **Opções:** risk, uncertainty, adaptability, complexity, planning

---

**Dilema 14**
- **Domínio:** Stakeholders
- **Cenário:** Após um projeto ser entregue com sucesso tecnicamente, a taxa de adoção pelos usuários é de apenas 15% depois de 3 meses.
- **Correto:** `change` (Permitir mudança para alcançar o estado futuro esperado)
- **Explicação:** Baixa adoção indica falha na gestão da mudança organizacional. O projeto entregou o sistema, mas não gerenciou a transição das pessoas para o novo estado.
- **Dica:** Implantação ≠ adoção. Mudança humana precisa ser gerenciada, não assumida.
- **Opções:** change, value, stakeholders, leadership, quality

---

**Dilema 15**
- **Domínio:** Trabalho
- **Cenário:** A equipe está usando uma metodologia ágil, mas os relatórios formais exigidos pelo PMO seguem um template de projeto preditivo desatualizado.
- **Correto:** `tailoring` (Adaptar com base no contexto)
- **Explicação:** Os processos de reporte devem ser adaptados para a abordagem escolhida. Templates rígidos que contradizem a abordagem criam burocracia sem valor.
- **Dica:** Adaptar não significa ignorar governance — significa fazê-la funcionar para o contexto.
- **Opções:** tailoring, adaptability, systems-thinking, leadership, quality

---

**Dilema 16**
- **Domínio:** Medição
- **Cenário:** O projeto está 20% acima do custo planejado, mas o gerente não consegue explicar por quê — só sabe que está caro.
- **Correto:** `value` (Focar no valor / usar métricas para decisões)
- **Explicação:** Métricas sem análise são ruído. O gerente precisa de um sistema de medição que rastreie causas, não apenas sintomas.
- **Dica:** Saber que está errado não é suficiente — você precisa saber *por que* está errado.
- **Opções:** value, risk, systems-thinking, adaptability, planning

---

**Dilema 17**
- **Domínio:** Entrega
- **Cenário:** Requisitos mal documentados estão causando retrabalho constante. A equipe implementa, apresenta, e recebe feedback "não era isso".
- **Correto:** `quality` (Incorporar qualidade — incluindo qualidade dos requisitos)
- **Explicação:** Qualidade começa nos requisitos. Requisitos ambíguos geram entregas incorretas. Investir em clareza antes de implementar economiza retrabalho.
- **Dica:** Um requisito ambíguo é um bug futuro garantido.
- **Opções:** quality, stakeholders, value, planning, adaptability

---

**Dilema 18**
- **Domínio:** Equipe
- **Cenário:** A equipe está trabalhando 12 horas por dia há 3 semanas para compensar atrasos, e os primeiros sinais de burnout começam a aparecer.
- **Correto:** `stewardship` (Ser zeloso — inclusive com as pessoas)
- **Explicação:** O gerente é guardião dos recursos, incluindo as pessoas. Permitir burnout é falha ética e estratégica — reduz qualidade, cria rotatividade e aumenta riscos.
- **Dica:** Equipe queimada entrega menos, não mais. Sustentabilidade é parte da entrega.
- **Opções:** stewardship, leadership, team, adaptability, risk

---

### DIFÍCEIS (7)

---

**Dilema 19**
- **Domínio:** Complexidade
- **Cenário:** Em um projeto de inovação, cada decisão tomada gera novos problemas imprevistos. O plano original ficou obsoleto na semana 2, mas a liderança insiste em segui-lo.
- **Correto:** `complexity` (Navegar na complexidade)
- **Explicação:** Em ambientes complexos (não apenas complicados), o comportamento emergente é esperado. Planos rígidos em contextos complexos são ilusão de controle. A abordagem correta é iterativa e adaptativa.
- **Dica:** Complexo ≠ complicado. Complicado tem solução conhecida; complexo precisa de exploração.
- **Opções:** complexity, adaptability, risk, systems-thinking, tailoring

---

**Dilema 20**
- **Domínio:** Stakeholders
- **Cenário:** Dois stakeholders de igual poder têm objetivos contraditórios para o projeto. Atender um significa frustrar o outro, e ambos têm veto sobre a entrega final.
- **Correto:** `stakeholders` (Engajar efetivamente + facilitar alinhamento)
- **Explicação:** Conflito entre stakeholders de poder igual exige facilitação ativa para chegar a um acordo. O gerente não pode escolher um lado — precisa criar espaço para negociação.
- **Dica:** Stakeholders em conflito precisam de mediação, não de escolha. Crie o espaço para o acordo.
- **Opções:** stakeholders, leadership, value, systems-thinking, change

---

**Dilema 21**
- **Domínio:** Incerteza
- **Cenário:** O projeto usa uma tecnologia nova que nunca foi implantada em produção na empresa. A equipe está confiante, mas há zero dados históricos para estimar com precisão.
- **Correto:** `risk` + `complexity` (Otimizar riscos em ambiente complexo)
- **Correto principal:** `risk`
- **Explicação:** Alta incerteza técnica requer gestão proativa de riscos: protótipos, spikes técnicos, planos de contingência. Confiança sem dados é viés cognitivo, não avaliação.
- **Dica:** Quando não há dados, crie experimentos para gerar dados antes de comprometer.
- **Opções:** risk, complexity, adaptability, quality, systems-thinking

---

**Dilema 22**
- **Domínio:** Entrega
- **Cenário:** No meio do projeto, a equipe percebe que a solução planejada vai resolver o problema técnico, mas não vai mudar o comportamento dos usuários que é a causa raiz real.
- **Correto:** `systems-thinking` (Ver o sistema completo, não apenas o problema técnico)
- **Explicação:** A causa raiz é comportamental, não técnica. Uma solução técnica para um problema de comportamento é sintomática. É necessário repensar o escopo para endereçar a causa real.
- **Dica:** Resolver o sintoma sem a causa raiz é garantia de reincidência.
- **Opções:** systems-thinking, value, change, quality, stakeholders

---

**Dilema 23**
- **Domínio:** Abordagem
- **Cenário:** O cliente quer entregas frequentes (ágil), mas os requisitos regulatórios exigem documentação completa antes de qualquer implementação (preditivo). O gerente precisa escolher uma abordagem.
- **Correto:** `tailoring` (Criar abordagem híbrida adaptada)
- **Explicação:** Este é o caso clássico para abordagem híbrida. Documentação regulatória pode ser feita de forma iterativa por componente. Não é binário ágil vs. preditivo.
- **Dica:** "Híbrido" não é fraqueza — é inteligência situacional.
- **Opções:** tailoring, adaptability, complexity, risk, leadership

---

**Dilema 24**
- **Domínio:** Medição
- **Cenário:** O projeto está no prazo e dentro do orçamento, mas pesquisas com usuários mostram insatisfação crescente com a direção do produto. A liderança ignora esses dados por serem "subjetivos".
- **Correto:** `value` (Focar no valor real — incluindo satisfação do usuário)
- **Explicação:** Dados de satisfação são sinais de valor futuro. Ignorá-los por serem subjetivos é erro de medição: o projeto pode estar no caminho para entregar o tecnicamente correto, mas inutilizado.
- **Dica:** Métricas "duras" sem métricas de valor são lagging indicators de fracasso.
- **Opções:** value, systems-thinking, stakeholders, adaptability, quality

---

**Dilema 25**
- **Domínio:** Todos
- **Cenário:** Um projeto crítico está sendo encerrado prematuramente por decisão executiva devido a mudança de estratégia organizacional. A equipe está desmotivada e quer saber o que acontecerá com eles.
- **Correto:** `stewardship` (Responsabilidade ética com a equipe e a organização)
- **Explicação:** Encerramento de projetos exige responsabilidade: documentar lições aprendidas, garantir transições dignas para a equipe, capturar o valor parcial entregue. O gerente é guardião mesmo no fim.
- **Dica:** Como você encerra um projeto diz muito sobre seu caráter como gerente.
- **Opções:** stewardship, leadership, change, team, adaptability

---

## Algoritmo de Seleção de Opções

Para cada dilema, as 5 opções são geradas assim:
1. **1 correto** (o princípio da resposta)
2. **2 distratores próximos** (princípios do mesmo domínio ou relacionados)
3. **2 distratores distantes** (princípios plausíveis mas claramente secundários)

O sistema embaralha as opções para cada sessão.

---

## Sistema de Pontuação

```ts
// Por sessão:
score = {
  correct: number,
  total: number,
  percentage: number,
  streak: number,           // sequência de acertos
  byDifficulty: {
    easy: { correct, total },
    medium: { correct, total },
    hard: { correct, total },
  }
}

// Badges desbloqueáveis:
// 🎯 Precisão — 10 acertos seguidos
// 🏆 Mestre — 100% em sessão de 10
// 🔥 Consistente — 7 dias seguidos com sessão
// 📚 Explorador — respondeu dilemas de todos os 8 domínios
```
