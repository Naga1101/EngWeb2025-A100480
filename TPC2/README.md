# EngWeb2025
## Aluno

**Nome:**  Nuno Aguiar

**Número:**  A100480

**Email:** a100480@alunos.uminho.pt

## Objetivo

Construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da escola de música (implementada na segunda aula teórica) e sirva um website com as seguintes caraterísticas:

- Página principal: Listar alunos, Listar Cursos, Listar Instrumentos;

- Página de alunos: Tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno);

- Página de cursos: Tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo);

- Página de instrumentos: Tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam).

## Como correr

Ao executar o comando seguinte irá iniciar o json-server ao mesmo tempo que será iniciado o servidor. 

```bash
$ npm run start
```

Poderá ser necessário correr o seguinte comando:

```bash
$ npm install concurrently
```
