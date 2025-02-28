# EngWeb2025
## Aluno

**Nome:**  Nuno Aguiar

**Número:**  A100480

**Email:** a100480@alunos.uminho.pt

## Objetivo

Construir um serviço em Node.js que consuma a API de dados servida pelo json-server e forneça uma aplicação de gestão de alunos. O serviço permite realizar operações criar, ler, atualizar e apagar sobre os dados dos alunos, com as seguintes funcionalidades:

- Página principal: Listar todos os alunos;
- Página de aluno: Visualizar detalhes de um aluno específico;
- Formulário de criação de aluno: Permitir a adição de um novo aluno;
- Formulário de edição de aluno: Permitir a alteração dos dados de um aluno existente;
- Botão para apagar aluno: Remover um aluno do sistema.

## Como correr

Ao executar o comando seguinte irá iniciar o json-server ao mesmo tempo que será iniciado o servidor. 

```bash
npm run start
```

Poderá ser necessário correr os seguintes comando:

```bash
npm install axios --save
```

```bash
npm install concurrently
```