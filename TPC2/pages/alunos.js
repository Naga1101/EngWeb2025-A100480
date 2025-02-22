const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/alunos`);
        const alunos = response.data;

        const alunosList = alunos.map(aluno => `
            <tr class="clickable-row" data-id="${aluno.id}">
                <td><strong>${aluno.id}</strong></td>
                <td><strong>${aluno.nome}</strong></td>
                <td><strong>${aluno.instrumento}</strong></td>
            </tr>
        `).join('');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lista de alunos</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #ffebcc; 
                            color: #e64a19;
                        }
                        h1 {
                            text-align: center;
                            color: white;
                        }
                        .header {
                            background-color: #e64a19; 
                            color: white;
                            padding: 20px;
                            text-align: center;
                        }
                        .btn {
                            background-color: #ff7043;
                            color: white;
                            padding: 12px 24px;
                            border-radius: 8px;
                            text-decoration: none;
                            margin-top: 20px;
                            display: inline-block;
                            transition: background-color 0.3s;
                            text-align: center;
                        }
                        .btn:hover {
                            background-color: #e65100;
                        }
                        table {
                            width: 80%;
                            margin: 20px auto;
                            border-collapse: collapse;
                        }
                        table, th, td {
                            border: 1px solid #ff7043; 
                        }
                        th, td {
                            padding: 10px;
                            text-align: left;
                        }
                        th {
                            background-color: #ff7043; 
                            color: white;
                        }
                        tr:nth-child(even) {
                            background-color: #fff3e0; 
                        }
                        tr:hover {
                            background-color: #ffcc80; 
                        }
                        .clickable-row {
                            cursor: pointer;
                        }
                        a {
                            text-decoration: none;
                            color: inherit;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Lista de alunos</h1>
                    </div>
                    <div class="content">
                        <a href="/" class="btn">Voltar para o menu inicial</a>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Instrumento</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${alunosList}
                            </tbody>
                        </table>
                    </div>
                    <script>
                        document.querySelectorAll('.clickable-row').forEach(row => {
                            row.addEventListener('click', function() {
                                const alunoId = this.getAttribute('data-id');
                                window.location.href = '/aluno/' + alunoId;
                            });
                        });
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching alunos:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Erro ao buscar alunos</h1>');
    }
};