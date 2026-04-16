# Mestrado TD 2026 — Hub de Estudo

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://app.netlify.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](#)

Hub de estudo interativo para o **Mestrado em Transformacao Digital** da [Universidade da Maia (UMAIA)](https://www.umaia.pt/) — 2.o Semestre, 2025/26.

## Sobre

Material de apoio colaborativo para 3 disciplinas do mestrado, com conteudo teorico, flashcards interativos, quizzes de autoavaliacao e acompanhamento de progresso. Site 100% estatico, sem dependencias externas.

## Disciplinas

| Disciplina | Docente | Topicos | Flashcards | Quizzes |
|---|---|---|---|---|
| **Business Analytics, Metrics e Big Data** | Prof. Rui Humberto Pereira | 4 | 32 | 24 |
| **Gestao e Governanca de Dados e de SI** | Prof. Pedro Pimenta | 7 | 46 | 32 |
| **Interface Homem-Maquina e Robotica** | Prof.a Ana Melro | 6 | 44 | 29 |

## Funcionalidades

- **Tema claro/escuro** — detecta preferencia do sistema, com toggle manual
- **Fonte ajustavel** — botoes A-/A+ para acessibilidade
- **Contagem regressiva** — para proximos testes, entregas e exames
- **Progresso de estudo** — marcar topicos como estudados (persistido em localStorage)
- **Flashcards interativos** — clique para virar, animacao 3D
- **Quizzes com feedback** — resposta correta/incorreta com pontuacao
- **Pesquisa** — filtrar conteudo dentro de cada disciplina
- **Links rapidos** — acesso direto ao Moodle e plataformas dos projetos
- **100% responsivo** — mobile-first, funciona em qualquer dispositivo
- **Acessibilidade** — suporte a `prefers-reduced-motion`, focus-visible, navegacao por teclado
- **Impressao** — estilos otimizados para `@media print`

## Estrutura do Projeto

```
mestrado-td-2026/
├── index.html          # Home — calendario, contagens, links
├── ba.html             # Business Analytics — 4 topicos de estudo
├── ggdsi.html          # Governanca de Dados — 7 topicos de estudo
├── ihmr.html           # Interface H-M e Robotica — 6 topicos de estudo
├── styles.css          # Design system completo (temas, componentes)
├── app.js              # Logica: tema, progresso, flashcards, quizzes, countdowns
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── .gitignore
```

## Inicio Rapido

### Visualizar localmente

Nenhuma instalacao necessaria. Basta abrir `index.html` num navegador, ou servir com qualquer servidor estatico:

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

### Deploy no Netlify

1. Fazer fork deste repositorio
2. Ir a [app.netlify.com](https://app.netlify.com/) → **Add new site** → **Import an existing project**
3. Conectar ao repositorio do GitHub
4. Configuracoes de build:
   - **Build command:** _(deixar vazio)_
   - **Publish directory:** `.`
5. Clicar em **Deploy site**

Alternativamente, arrastar a pasta do projeto diretamente para o painel do Netlify (drag & drop).

## Datas Importantes

| Data | Evento | Disciplina | Peso |
|---|---|---|---|
| 22 abr 2026 | Teste TP1 | GGDSI | 20% |
| 13 mai 2026 | Teste TP2 | GGDSI | 40% |
| 25 mai 2026 | Teste M1 + Projeto Grupo | BA | 60% + 25% |
| 29 mai 2026 | Pitch + Projeto Final | IHMR | 60% |
| 02 jun 2026 | Apresentacao Individual | BA | 15% |
| 15 jun 2026 | Entrega Projeto | GGDSI | 40% |
| 29 jun 2026 | Exame Normal | IHMR | 100% |
| 08 jul 2026 | Exame de Recurso | IHMR | 100% |

## Stack Tecnica

| Tecnologia | Utilizacao |
|---|---|
| HTML5 | Estrutura semantica |
| CSS3 | Design system com custom properties, media queries, print styles |
| JavaScript (ES6+) | Interatividade, localStorage, DOM manipulation |
| [Inter](https://fonts.google.com/specimen/Inter) | Tipografia via Google Fonts |

**Zero dependencias.** Sem frameworks, sem bundlers, sem build step. O site e servido diretamente como ficheiros estaticos.

## Acessibilidade

- Suporte completo a navegacao por teclado (`focus-visible`)
- Respeita `prefers-reduced-motion` — desativa animacoes automaticamente
- Contraste adequado em ambos os temas (claro e escuro)
- Tamanho de fonte ajustavel (12px–24px)
- Estrutura semantica com headings hierarquicos
- Estilos de impressao otimizados

## Contribuicao

Contribuicoes de colegas do mestrado sao bem-vindas! Consulte o [CONTRIBUTING.md](CONTRIBUTING.md) para orientacoes.

## Licenca

Este projeto esta licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com o apoio de [Claude Code](https://claude.ai/claude-code) para o Mestrado em Transformacao Digital — UMAIA 2025/26.
