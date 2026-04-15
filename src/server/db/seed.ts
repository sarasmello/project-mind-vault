import { db } from "./index";
import {
  domains,
  principles,
  domainPrinciples,
  activities,
  outcomes,
} from "./schema";

async function seed() {
  console.log("🌱 Iniciando seed...");

  // ── 1. PRINCÍPIOS (12) ────────────────────────────────────────────────────

  const principlesData = [
    {
      slug: "stewardship",
      name: "Ser um administrador zeloso, confiável e ético",
      shortDescription: "Agir com integridade, cuidado e confiança",
      fullDescription:
        "Os gerentes de projeto têm a responsabilidade de agir como guardiões da organização e do projeto, tomando decisões éticas e sendo confiáveis por todas as partes.",
      rationale:
        "Projetos falham quando há falta de confiança. A ética é a base de todas as relações no projeto.",
      examples: JSON.stringify([
        "Reportar riscos mesmo que sejam inconvenientes",
        "Proteger dados confidenciais dos stakeholders",
        "Reconhecer limitações e buscar ajuda quando necessário",
      ]),
      color: "#6366f1",
      order: 1,
    },
    {
      slug: "team",
      name: "Criar um ambiente colaborativo de equipe",
      shortDescription:
        "Promover cultura de colaboração e responsabilidade compartilhada",
      fullDescription:
        "Times de projeto funcionam melhor quando há cultura de colaboração, responsabilidade compartilhada e respeito mútuo.",
      rationale:
        "Nenhum projeto é entregue por uma pessoa sozinha. O ambiente determina o desempenho coletivo.",
      examples: JSON.stringify([
        "Definir normas de equipe no início do projeto",
        "Celebrar conquistas coletivas",
        "Resolver conflitos de forma construtiva",
      ]),
      color: "#8b5cf6",
      order: 2,
    },
    {
      slug: "stakeholders",
      name: "Engajar efetivamente as partes interessadas",
      shortDescription: "Envolver stakeholders para garantir entrega de valor",
      fullDescription:
        "O engajamento proativo e contínuo das partes interessadas é essencial para o sucesso do projeto.",
      rationale:
        "Stakeholders desengajados são a principal causa de projetos que entregam o tecnicamente correto, mas não o que o negócio precisava.",
      examples: JSON.stringify([
        "Mapear stakeholders por poder e interesse",
        "Comunicar progresso regularmente",
        "Incluir stakeholders nas decisões que os afetam",
      ]),
      color: "#06b6d4",
      order: 3,
    },
    {
      slug: "value",
      name: "Focar no valor",
      shortDescription:
        "Alinhar continuamente o projeto com os resultados de negócio",
      fullDescription:
        "O sucesso do projeto não é medido apenas pela entrega dentro do prazo e custo, mas pelo valor real gerado para os stakeholders e a organização.",
      rationale:
        "Projetos 'bem-sucedidos' que não geram valor são falhas disfarçadas.",
      examples: JSON.stringify([
        "Questionar o valor de cada requisito antes de implementar",
        "Medir benefícios, não apenas outputs",
        "Renegociar escopo quando o valor esperado muda",
      ]),
      color: "#10b981",
      order: 4,
    },
    {
      slug: "systems-thinking",
      name: "Reconhecer, avaliar e responder às interações do sistema",
      shortDescription: "Pensar sistemicamente além das fronteiras do projeto",
      fullDescription:
        "Projetos existem dentro de sistemas maiores. Decisões têm consequências além do projeto imediato.",
      rationale:
        "Soluções locais criam problemas sistêmicos quando não se considera o todo.",
      examples: JSON.stringify([
        "Analisar impactos de mudança em outros sistemas",
        "Considerar dependências organizacionais",
        "Avaliar efeitos colaterais das decisões",
      ]),
      color: "#f59e0b",
      order: 5,
    },
    {
      slug: "leadership",
      name: "Demonstrar comportamentos de liderança",
      shortDescription: "Liderar pelo exemplo, adaptando o estilo ao contexto",
      fullDescription:
        "Liderança eficaz vai além do título. Inclui motivar, influenciar, comunicar e servir a equipe.",
      rationale:
        "Times precisam de direção e suporte. Sem liderança, projetos complexos se perdem.",
      examples: JSON.stringify([
        "Adaptar estilo de liderança (diretivo, coach, delegativo)",
        "Remover impedimentos para a equipe",
        "Criar visão compartilhada do objetivo",
      ]),
      color: "#ef4444",
      order: 6,
    },
    {
      slug: "tailoring",
      name: "Adaptar com base no contexto",
      shortDescription: "Personalizar abordagem para o contexto específico",
      fullDescription:
        "Não existe uma abordagem única. O gerente deve adaptar processos, ferramentas e métodos ao contexto do projeto.",
      rationale:
        "Seguir metodologia rigidamente sem adaptar ao contexto é receita para ineficiência.",
      examples: JSON.stringify([
        "Escolher entre preditivo, ágil ou híbrido conscientemente",
        "Ajustar nível de documentação ao risco do projeto",
        "Simplificar processos para projetos pequenos",
      ]),
      color: "#ec4899",
      order: 7,
    },
    {
      slug: "quality",
      name: "Incorporar qualidade nos processos e entregas",
      shortDescription: "Qualidade é construída, não inspecionada depois",
      fullDescription:
        "Qualidade deve ser integrada às atividades do projeto, não verificada apenas ao final.",
      rationale:
        "Detectar problemas de qualidade tarde custa exponencialmente mais do que preveni-los.",
      examples: JSON.stringify([
        "Definir critérios de aceitação antes de começar",
        "Revisões de qualidade durante o trabalho",
        "Métricas de qualidade desde o início",
      ]),
      color: "#14b8a6",
      order: 8,
    },
    {
      slug: "complexity",
      name: "Navegar na complexidade",
      shortDescription:
        "Usar abordagens adaptativas para ambientes complexos",
      fullDescription:
        "Projetos complexos têm comportamentos emergentes e não-lineares. Requerem abordagens diferentes de projetos complicados.",
      rationale:
        "Tratar complexidade como complicado leva a soluções que não funcionam no mundo real.",
      examples: JSON.stringify([
        "Usar iterações curtas para reduzir incerteza",
        "Experimentar antes de comprometer grandes investimentos",
        "Aceitar que o plano vai mudar",
      ]),
      color: "#7c3aed",
      order: 9,
    },
    {
      slug: "risk",
      name: "Otimizar respostas a riscos",
      shortDescription: "Identificar e responder a ameaças e oportunidades",
      fullDescription:
        "Risco não é apenas ameaça — inclui oportunidades. A gestão de riscos deve ser contínua e proporcional.",
      rationale:
        "Projetos sem gestão de riscos são reativos. Com ela, são proativos.",
      examples: JSON.stringify([
        "Identificar riscos regularmente em cerimônias da equipe",
        "Explorar oportunidades, não apenas mitigar ameaças",
        "Ter planos de contingência para riscos críticos",
      ]),
      color: "#dc2626",
      order: 10,
    },
    {
      slug: "adaptability",
      name: "Abraçar adaptabilidade e resiliência",
      shortDescription:
        "Manter flexibilidade sem perder o foco no objetivo",
      fullDescription:
        "Projetos precisam se adaptar a mudanças internas e externas. Resiliência é a capacidade de absorver mudanças e continuar.",
      rationale:
        "O ambiente de projetos é dinâmico. Rigidez excessiva cria fragilidade.",
      examples: JSON.stringify([
        "Construir buffers de tempo e custo",
        "Revisar e ajustar planos regularmente",
        "Aprender com falhas sem culpabilização",
      ]),
      color: "#0891b2",
      order: 11,
    },
    {
      slug: "change",
      name: "Permitir mudança para alcançar o estado futuro esperado",
      shortDescription:
        "Facilitar a mudança organizacional que o projeto requer",
      fullDescription:
        "Projetos mudam organizações. O gerente deve considerar a gestão da mudança organizacional como parte do trabalho.",
      rationale:
        "Projetos técnicos perfeitos falham quando a organização não adota o resultado.",
      examples: JSON.stringify([
        "Envolver usuários finais desde o início",
        "Planejar treinamentos e comunicação da mudança",
        "Medir adoção, não apenas implantação",
      ]),
      color: "#059669",
      order: 12,
    },
  ];

  await db.insert(principles).values(principlesData);
  console.log("✅ 12 princípios inseridos");

  // ── 2. DOMÍNIOS (8) ───────────────────────────────────────────────────────

  const domainsData = [
    {
      slug: "stakeholders",
      name: "Stakeholders",
      description:
        "Atividades e funções associadas ao engajamento das partes interessadas.",
      longDescription:
        "Foca em identificar, compreender e engajar efetivamente todas as partes interessadas ao longo do ciclo de vida do projeto.",
      color: "#6366f1",
      icon: "Users",
      order: 1,
    },
    {
      slug: "team",
      name: "Equipe",
      description:
        "Atividades e funções associadas às pessoas responsáveis por produzir as entregas.",
      longDescription:
        "Cobre liderança, desenvolvimento da equipe, cultura, diversidade e criação de ambiente de alto desempenho.",
      color: "#8b5cf6",
      icon: "Handshake",
      order: 2,
    },
    {
      slug: "development-approach",
      name: "Abordagem de Desenvolvimento",
      description:
        "Atividades associadas à abordagem de desenvolvimento, cadência e fases do projeto.",
      longDescription:
        "Determinar a abordagem correta (preditiva, ágil, híbrida) e estruturar o ciclo de vida adequadamente.",
      color: "#06b6d4",
      icon: "GitBranch",
      order: 3,
    },
    {
      slug: "planning",
      name: "Planejamento",
      description:
        "Atividades associadas à organização e coordenação inicial e contínua.",
      longDescription:
        "Planejamento adaptativo que evolui ao longo do projeto, não um plano rígido feito uma vez.",
      color: "#3b82f6",
      icon: "ClipboardList",
      order: 4,
    },
    {
      slug: "project-work",
      name: "Trabalho do Projeto",
      description:
        "Atividades associadas ao estabelecimento de processos e execução do trabalho.",
      longDescription:
        "Gerenciar o trabalho do dia a dia: processos, comunicações, recursos físicos, aquisições.",
      color: "#f59e0b",
      icon: "Wrench",
      order: 5,
    },
    {
      slug: "delivery",
      name: "Entrega",
      description:
        "Atividades associadas à entrega do escopo e da qualidade.",
      longDescription:
        "Garantir que as entregas atendam aos requisitos, critérios de aceitação e gerem o valor esperado.",
      color: "#10b981",
      icon: "Package",
      order: 6,
    },
    {
      slug: "measurement",
      name: "Medição",
      description:
        "Atividades associadas à avaliação do desempenho do projeto.",
      longDescription:
        "Definir métricas, coletar dados, interpretar resultados e tomar decisões baseadas em dados.",
      color: "#ec4899",
      icon: "BarChart2",
      order: 7,
    },
    {
      slug: "uncertainty",
      name: "Incerteza",
      description:
        "Atividades associadas a riscos e incertezas.",
      longDescription:
        "Identificar e responder a ameaças e oportunidades em ambientes de alta ambiguidade e volatilidade.",
      color: "#ef4444",
      icon: "CloudLightning",
      order: 8,
    },
  ];

  await db.insert(domains).values(domainsData);
  console.log("✅ 8 domínios inseridos");

  // ── 3. RELAÇÕES DOMÍNIO ↔ PRINCÍPIO ──────────────────────────────────────

  const allDomains = await db.query.domains.findMany();
  const allPrinciples = await db.query.principles.findMany();

  const dMap = Object.fromEntries(allDomains.map((d) => [d.slug, d.id]));
  const pMap = Object.fromEntries(allPrinciples.map((p) => [p.slug, p.id]));

  const relations = [
    // Stakeholders
    { d: "stakeholders", p: "stakeholders", relevance: "primária" },
    { d: "stakeholders", p: "stewardship",  relevance: "secundária" },
    { d: "stakeholders", p: "value",        relevance: "secundária" },
    { d: "stakeholders", p: "change",       relevance: "secundária" },
    // Equipe
    { d: "team", p: "team",       relevance: "primária" },
    { d: "team", p: "leadership", relevance: "primária" },
    { d: "team", p: "stewardship", relevance: "secundária" },
    { d: "team", p: "adaptability", relevance: "secundária" },
    // Abordagem
    { d: "development-approach", p: "tailoring",    relevance: "primária" },
    { d: "development-approach", p: "adaptability", relevance: "primária" },
    { d: "development-approach", p: "complexity",   relevance: "secundária" },
    { d: "development-approach", p: "systems-thinking", relevance: "secundária" },
    // Planejamento
    { d: "planning", p: "tailoring",        relevance: "primária" },
    { d: "planning", p: "risk",             relevance: "secundária" },
    { d: "planning", p: "complexity",       relevance: "secundária" },
    { d: "planning", p: "value",            relevance: "secundária" },
    { d: "planning", p: "systems-thinking", relevance: "secundária" },
    // Trabalho
    { d: "project-work", p: "stewardship", relevance: "primária" },
    { d: "project-work", p: "leadership",  relevance: "secundária" },
    { d: "project-work", p: "team",        relevance: "secundária" },
    { d: "project-work", p: "value",       relevance: "secundária" },
    { d: "project-work", p: "quality",     relevance: "secundária" },
    // Entrega
    { d: "delivery", p: "value",   relevance: "primária" },
    { d: "delivery", p: "quality", relevance: "primária" },
    { d: "delivery", p: "change",  relevance: "secundária" },
    { d: "delivery", p: "stakeholders", relevance: "secundária" },
    // Medição
    { d: "measurement", p: "value",      relevance: "primária" },
    { d: "measurement", p: "stewardship", relevance: "secundária" },
    { d: "measurement", p: "complexity",  relevance: "secundária" },
    { d: "measurement", p: "stakeholders", relevance: "secundária" },
    // Incerteza
    { d: "uncertainty", p: "risk",         relevance: "primária" },
    { d: "uncertainty", p: "adaptability", relevance: "primária" },
    { d: "uncertainty", p: "complexity",   relevance: "primária" },
    { d: "uncertainty", p: "systems-thinking", relevance: "secundária" },
    { d: "uncertainty", p: "tailoring",    relevance: "secundária" },
  ];

  await db.insert(domainPrinciples).values(
    relations.map((r) => ({
      domainId: dMap[r.d]!,
      principleId: pMap[r.p]!,
      relevance: r.relevance,
    }))
  );
  console.log("✅ Relações domínio ↔ princípio inseridas");

  // ── 4. ATIVIDADES (exemplos por domínio) ─────────────────────────────────

  const activitiesData = [
    // Stakeholders
    { domainId: dMap["stakeholders"]!, title: "Identificar partes interessadas", description: "Mapear todos os indivíduos, grupos ou organizações que podem afetar ou ser afetados pelo projeto.", order: 1 },
    { domainId: dMap["stakeholders"]!, title: "Analisar expectativas", description: "Compreender os interesses, expectativas, influência e impacto potencial de cada parte interessada.", order: 2 },
    { domainId: dMap["stakeholders"]!, title: "Planejar o engajamento", description: "Definir estratégias e ações para engajar cada stakeholder de forma eficaz ao longo do projeto.", order: 3 },
    { domainId: dMap["stakeholders"]!, title: "Executar e monitorar o engajamento", description: "Implementar o plano de engajamento e ajustar a abordagem conforme o projeto evolui.", order: 4 },
    // Equipe
    { domainId: dMap["team"]!, title: "Definir valores e normas", description: "Estabelecer acordos de trabalho que guiem o comportamento e as interações da equipe.", order: 1 },
    { domainId: dMap["team"]!, title: "Desenvolver competências", description: "Identificar lacunas de conhecimento e criar oportunidades de desenvolvimento técnico e comportamental.", order: 2 },
    { domainId: dMap["team"]!, title: "Liderar e motivar", description: "Aplicar estilos de liderança adequados ao contexto e nível de maturidade de cada membro.", order: 3 },
    // Entrega
    { domainId: dMap["delivery"]!, title: "Gerenciar requisitos", description: "Elicitar, documentar, priorizar e rastrear requisitos ao longo do ciclo de vida do projeto.", order: 1 },
    { domainId: dMap["delivery"]!, title: "Controlar o escopo", description: "Garantir que apenas o trabalho aprovado seja realizado, gerenciando solicitações de mudança.", order: 2 },
    { domainId: dMap["delivery"]!, title: "Validar entregas", description: "Confirmar com os stakeholders que as entregas atendem aos critérios de aceitação.", order: 3 },
    // Incerteza
    { domainId: dMap["uncertainty"]!, title: "Identificar riscos", description: "Reconhecer ameaças e oportunidades que podem impactar os objetivos do projeto.", order: 1 },
    { domainId: dMap["uncertainty"]!, title: "Analisar riscos", description: "Avaliar probabilidade, impacto e prioridade dos riscos identificados.", order: 2 },
    { domainId: dMap["uncertainty"]!, title: "Planejar respostas", description: "Definir estratégias e ações para cada risco priorizado (evitar, mitigar, transferir, aceitar).", order: 3 },
  ];

  await db.insert(activities).values(activitiesData);
  console.log("✅ Atividades inseridas");

  // ── 5. RESULTADOS ESPERADOS ───────────────────────────────────────────────

  const outcomesData = [
    { domainId: dMap["stakeholders"]!, text: "Relacionamento produtivo e de confiança com todas as partes interessadas", order: 1 },
    { domainId: dMap["stakeholders"]!, text: "Acordo estabelecido sobre objetivos, escopo e qualidade esperada", order: 2 },
    { domainId: dMap["stakeholders"]!, text: "Stakeholders beneficiários satisfeitos com os resultados do projeto", order: 3 },
    { domainId: dMap["team"]!, text: "Equipe de alto desempenho com cultura colaborativa estabelecida", order: 1 },
    { domainId: dMap["team"]!, text: "Liderança compartilhada exercida quando apropriado ao contexto", order: 2 },
    { domainId: dMap["delivery"]!, text: "Entregas que atendem aos critérios de aceitação acordados", order: 1 },
    { domainId: dMap["delivery"]!, text: "Valor entregue e reconhecido pelos beneficiários do projeto", order: 2 },
    { domainId: dMap["uncertainty"]!, text: "Ameaças minimizadas e oportunidades exploradas proativamente", order: 1 },
    { domainId: dMap["uncertainty"]!, text: "Incerteza reduzida progressivamente ao longo do projeto", order: 2 },
  ];

  await db.insert(outcomes).values(outcomesData);
  console.log("✅ Resultados esperados inseridos");

  console.log("\n🎉 Seed concluído com sucesso!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
