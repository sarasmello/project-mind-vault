# Contribuindo com o Project Mind Vault

Obrigada pelo interesse em contribuir! Este documento descreve o processo e os padrões para contribuição neste projeto.

---

## Código de Conduta

Ao participar deste projeto, você concorda em manter um ambiente respeitoso e inclusivo para todos os colaboradores.

---

## Como Contribuir

### Reportando Bugs

1. Verifique se o problema já existe nas [Issues](https://github.com/sarasmello/project-mind-vault/issues)
2. Se não existir, abra uma nova issue usando o template **Relatório de Bug**
3. Inclua: passos para reproduzir, comportamento esperado, comportamento real e detalhes do ambiente

### Sugerindo Funcionalidades

1. Abra uma issue usando o template **Solicitação de Funcionalidade**
2. Descreva o problema que resolve e a solução proposta
3. Aguarde a discussão antes de iniciar a implementação

### Enviando Código

1. Faça um fork do repositório
2. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   # ou
   git checkout -b fix/descricao-do-problema
   ```
3. Escreva seu código seguindo os padrões abaixo
4. Faça commits usando [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   ```
   feat: adiciona página de detalhe do domínio
   fix: corrige cálculo do intervalo SM-2
   docs: atualiza guia de template de flashcard
   refactor: simplifica estrutura do router tRPC
   chore: atualiza dependências
   ```
5. Envie e abra um Pull Request apontando para `main`

---

## Padrões de Desenvolvimento

### Estilo de Código

- **TypeScript** — modo strict, sem `any`
- **Componentes** — apenas funcionais, sem classes
- **Nomenclatura** — camelCase para variáveis/funções, PascalCase para componentes/tipos
- **Arquivos** — kebab-case para nomes de arquivos

### Mensagens de Commit

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

Tipos: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore`

### Checklist para Pull Request

- [ ] O código segue as diretrizes de estilo do projeto
- [ ] TypeScript compila sem erros (`pnpm type-check`)
- [ ] Sem erros de lint (`pnpm lint`)
- [ ] Revisão própria concluída
- [ ] Nenhum conteúdo protegido do Guia PMBOK® foi adicionado literalmente

---

## ⚖️ Diretrizes de Direitos Autorais — CRÍTICO

Este projeto referencia conceitos do Guia PMBOK®. **Todos os contribuidores devem seguir estas regras:**

### ✅ Permitido
- Explicações originais de conceitos gerais de gerenciamento de projetos
- Conteúdo educacional transformador (quizzes, resumos com suas próprias palavras)
- Referências aos nomes de domínios e princípios (são termos descritivos)
- Citar "Guia PMBOK® — Sétima Edição, PMI" como referência bibliográfica

### ❌ Não Permitido
- Copiar texto literal do Guia PMBOK®
- Reproduzir tabelas, figuras ou diagramas do livro
- Conteúdo que possa substituir a compra do livro oficial
- Subir o PDF ou qualquer trecho dele para este repositório

Em caso de dúvida, escreva o conteúdo **com suas próprias palavras** e adicione uma citação de referência.

---

## Obtendo Ajuda

- Abra uma [Discussion](https://github.com/sarasmello/project-mind-vault/discussions) para dúvidas
- Marque sua issue com `pergunta` para triagem rápida
