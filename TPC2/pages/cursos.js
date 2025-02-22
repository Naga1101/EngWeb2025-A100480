const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/cursos`);
        const cursos = response.data;

        const cursosList = cursos.map(curso => `
            <tr class="clickable-row" data-id="${curso.id}">
                <td><strong>${curso.id}</strong></td>
                <td><strong>${curso.designacao}</strong></td>
                <td><strong>${curso.duracao}</strong></td>
            </tr>
        `).join('');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lista de cursos</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #ffebcc; 
                            color: #e64a19;
                        }
                        h2 {
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
                        <h2>Lista de cursos</h2>
                    </div>
                    <div class="content">
                        <a href="/" class="btn">Voltar para o menu inicial</a>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Designação</th>
                                    <th>Duração</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${cursosList}
                            </tbody>
                        </table>
                    </div>
                    <script>
                        document.querySelectorAll('.clickable-row').forEach(row => {
                            row.addEventListener('click', function() {
                                const cursoId = this.getAttribute('data-id');
                                window.location.href = '/curso/' + cursoId;
                            });
                        });
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching cursos:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Erro ao buscar cursos</h1>');
    }
};