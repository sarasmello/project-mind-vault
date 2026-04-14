<div align="center">

# 🧭 Project Mind Vault
### PMBOK® 7 Navigator

**Sistema interativo de aprendizado para o Guia PMBOK® — Sétima Edição**  
Desenvolvido com Next.js 15 · tRPC · Drizzle ORM · SQLite · Obsidian

[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![PRs Bem-vindos](https://img.shields.io/badge/PRs-bem--vindos-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

> ⚠️ **Aviso de Direitos Autorais** — Este projeto é uma **ferramenta educacional independente** e **não possui qualquer vínculo, endosso ou patrocínio do PMI (Project Management Institute)**. PMBOK®, PMP® e PMI® são marcas registradas do Project Management Institute, Inc. Este software **não reproduz conteúdo protegido por direitos autorais** do Guia PMBOK®. Ele oferece uma interface interativa para estudo autônomo, com conteúdo original e transformador inspirado em princípios públicos de gerenciamento de projetos. Para referência oficial e completa, o usuário deve adquirir sua própria cópia licenciada do *Guia PMBOK® — Sétima Edição*.

---

## 📖 O que é este projeto?

O **Project Mind Vault** transforma o estudo passivo em aprendizado ativo e prático. Em vez de navegar por centenas de páginas de documentação, você:

- 🗺️ **Explora** os 8 Domínios de Desempenho de forma visual e interativa
- 🧩 **Testa** seu julgamento com dilemas reais de projetos
- 🃏 **Revisa** flashcards com repetição espaçada (algoritmo SM-2)
- 🔧 **Consulta** uma biblioteca pesquisável de modelos, métodos e ferramentas

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---------------|-----------|
| **Explorador de Domínios** | Cards interativos para cada um dos 8 Domínios de Desempenho, com atividades, resultados esperados e conexões com os 12 Princípios |
| **Simulador de Dilemas** | Mais de 25 cenários reais de projetos — escolha o princípio mais adequado e receba feedback detalhado |
| **Flashcards Inteligentes** | Cards escritos no Obsidian (Markdown) revisados com o algoritmo de repetição espaçada SM-2 |
| **Biblioteca de Modelos** | Mais de 30 ferramentas e frameworks, filtráveis por domínio, tipo e abordagem |

---

## 🏗️ Stack Tecnológica

```
Frontend    →  Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
Interface   →  shadcn/ui + Framer Motion + Lucide React
Estado      →  Zustand
API         →  tRPC v11 (tipagem end-to-end)
ORM         →  Drizzle ORM
Banco       →  SQLite via Turso (ou better-sqlite3 localmente)
Conteúdo    →  Vault Obsidian (arquivos .md) processados com gray-matter + remark
Deploy      →  Vercel + Turso
```

---

## 🚀 Como Começar

### Pré-requisitos

- Node.js ≥ 20
- pnpm ≥ 9

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/sarasmello/project-mind-vault.git
cd project-mind-vault

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com seus valores (veja a seção abaixo)

# 4. Configure o banco de dados
pnpm db:push    # Aplica o schema
pnpm db:seed    # Popula com os dados iniciais

# 5. Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

---

## ⚙️ Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
# Banco de dados — SQLite local (desenvolvimento)
DATABASE_URL=file:./local.db
DATABASE_AUTH_TOKEN=

# Banco de dados — Turso (produção)
# DATABASE_URL=libsql://seu-banco.turso.io
# DATABASE_AUTH_TOKEN=seu-token

# Caminho absoluto para o vault do Obsidian
OBSIDIAN_VAULT_PATH=/caminho/para/seu/vault-obsidian

# Aplicação
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
project-mind-vault/
├── src/
│   ├── app/                    # Páginas (Next.js App Router)
│   │   ├── page.tsx            # Explorador de Domínios (home)
│   │   ├── domains/[slug]/     # Detalhe de cada domínio
│   │   ├── simulator/          # Simulador de Dilemas
│   │   ├── flashcards/         # Sessão de revisão de flashcards
│   │   └── models/             # Biblioteca de Modelos e Métodos
│   ├── components/             # Componentes reutilizáveis
│   ├── server/
│   │   ├── db/                 # Schema Drizzle, migrations e seed
│   │   └── trpc/               # Routers tRPC
│   ├── lib/                    # Utilitários (SM-2, parser Obsidian)
│   └── store/                  # Stores Zustand
├── obsidian-docs/              # Documentação técnica do projeto
├── drizzle/                    # Migrations do banco de dados
├── .env.example
└── README.md
```

---

## 🃏 Sistema de Flashcards (Integração Obsidian)

Os flashcards são escritos como arquivos Markdown no seu vault do Obsidian. A aplicação os lê em tempo real, interpreta o frontmatter e aplica o algoritmo SM-2 para agendar as revisões.

### Criando um Flashcard

Crie qualquer arquivo `.md` no vault com esta estrutura:

```markdown
---
type: flashcard
domain: stakeholders
difficulty: medium
tags: [engajamento, definição]
---

## FRENTE

Qual a diferença principal entre identificar e engajar partes interessadas?

## VERSO

**Identificar** é um ato pontual de mapear quem são as partes interessadas.

**Engajar** é um processo contínuo de:
- Compreender expectativas
- Comunicar proativamente
- Gerenciar resistências

> O PMBOK® 7 enfatiza o engajamento contínuo, não apenas a identificação inicial.
```

Consulte [obsidian-docs/10 - Flashcards.md](obsidian-docs/10%20-%20Flashcards.md) para a documentação completa do template.

---

## 🗄️ Comandos do Banco de Dados

```bash
pnpm db:push       # Aplica mudanças no schema (dev — sem arquivo de migration)
pnpm db:generate   # Gera arquivos de migration
pnpm db:migrate    # Aplica migrations pendentes
pnpm db:seed       # Popula o banco com dados iniciais
pnpm db:studio     # Abre o Drizzle Studio (visualizador do banco)
pnpm db:reset      # Recria e repopula o banco (somente dev)
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes de começar.

1. Faça um fork do repositório
2. Crie sua branch: `git checkout -b feature/sua-funcionalidade`
3. Faça o commit: `git commit -m 'feat: adiciona sua funcionalidade'`
4. Envie para a branch: `git push origin feature/sua-funcionalidade`
5. Abra um Pull Request

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

---

## ⚖️ Aspectos Legais e Direitos Autorais

### Este Projeto

Este software está licenciado sob a [Licença MIT](LICENSE). Você é livre para usar, modificar e distribuir.

### PMBOK® e PMI®

- **PMBOK®**, **PMP®**, **PMI®** e **Project Management Professional®** são marcas registradas do **Project Management Institute, Inc.**
- Este projeto **não possui vínculo** com o PMI e **não é endossado nem patrocinado** por ele.
- Este projeto **não reproduz, distribui ou substitui** o Guia PMBOK®.
- Os 8 Domínios de Desempenho e os 12 Princípios referenciados aqui são abordados em alto nível para **fins educacionais e transformadores**, em conformidade com os princípios de uso justo.
- Para conteúdo oficial e completo, adquira uma cópia do *Guia PMBOK® — Sétima Edição* em [PMI.org](https://www.pmi.org).

### Declaração de Uso Justo

O conteúdo educacional desta aplicação constitui **obra original** *inspirada* no conhecimento geral de gerenciamento de projetos. É de natureza transformadora — converte material de referência passivo em experiência de aprendizado interativa — e não substitui a obra original protegida por direitos autorais.

---

## 🗺️ Roadmap

- [x] Documentação e arquitetura do projeto
- [ ] Fase 1 — Setup do projeto e seed do banco
- [ ] Fase 2 — Explorador de Domínios
- [ ] Fase 3 — Simulador de Dilemas
- [ ] Fase 4 — Sistema de Flashcards com SM-2
- [ ] Fase 5 — Biblioteca de Modelos e Métodos
- [ ] Fase 6 — Refinamentos, PWA e modo escuro

---

## 📄 Licença

[MIT](LICENSE) © 2024 Sara Smello

---

<div align="center">

Feito com ❤️ para quem estuda gerenciamento de projetos

*"Não leia o PMBOK. Navegue nele."*

</div>
