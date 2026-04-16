# Contribuicao

Obrigado por querer contribuir para o Hub de Estudo do Mestrado TD 2026!

## Como contribuir

### Reportar erros no conteudo

Se encontraste um erro numa resposta de quiz, flashcard ou na teoria:

1. Abre uma [Issue](../../issues/new) com o titulo: `[Erro] Disciplina — Topico — Descricao breve`
2. Indica a pagina, o topico e o que esta incorreto
3. Se possivel, inclui a correcao sugerida com referencia bibliografica

### Sugerir conteudo adicional

1. Abre uma [Issue](../../issues/new) com o titulo: `[Sugestao] Disciplina — Descricao`
2. Descreve o conteudo que falta e porque e relevante

### Submeter alteracoes

1. Faz **fork** do repositorio
2. Cria uma branch: `git checkout -b melhoria/descricao-breve`
3. Faz as alteracoes
4. Testa localmente abrindo os ficheiros no navegador
5. Faz commit: `git commit -m "Descricao da alteracao"`
6. Faz push: `git push origin melhoria/descricao-breve`
7. Abre um **Pull Request**

## Diretrizes

- **Conteudo em Portugues** (Portugal)
- **Sem dependencias externas** — o site deve continuar a funcionar como ficheiros estaticos
- **Manter consistencia** — seguir o mesmo estilo de HTML/CSS/JS existente
- **Testar em mobile** — garantir que as alteracoes funcionam em ecras pequenos
- **Verificar ambos os temas** — testar no modo claro e escuro

## Estrutura dos ficheiros

| Ficheiro | Conteudo |
|---|---|
| `index.html` | Home com calendario, contagens regressivas e links |
| `ba.html` | Business Analytics — topicos, flashcards, quizzes |
| `ggdsi.html` | Governanca de Dados — topicos, flashcards, quizzes |
| `ihmr.html` | Interface Homem-Maquina — topicos, flashcards, quizzes |
| `styles.css` | Todos os estilos (design system, temas, responsividade) |
| `app.js` | Toda a logica (tema, progresso, interatividade) |

## Adicionar conteudo a uma disciplina

### Novo flashcard

Dentro do `accordion-body` do topico respetivo, na secao de flashcards:

```html
<div class="flashcard">
  <div class="flashcard-inner">
    <div class="flashcard-front">Pergunta aqui</div>
    <div class="flashcard-back">Resposta aqui</div>
  </div>
</div>
```

### Nova pergunta de quiz

Dentro da secao de quiz do topico:

```html
<div class="quiz-block">
  <p class="quiz-question-text">Pergunta aqui?</p>
  <div class="quiz-options">
    <button class="quiz-option">Opcao errada</button>
    <button class="quiz-option" data-correct="true">Opcao correta</button>
    <button class="quiz-option">Opcao errada</button>
    <button class="quiz-option">Opcao errada</button>
  </div>
</div>
```

### Novo concept card

```html
<div class="concept-card">
  <h4>Titulo do Conceito</h4>
  <p>Explicacao breve do conceito.</p>
</div>
```
