const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    try {
        const cursoId = req.params.id;
        const response = await axios.get(`${JSON_SERVER_URL}/cursos/${cursoId}`);
        const curso = response.data;

        const alunosList = curso.alunos.map(alunoId => {
            return `
                <li>
                    <a href="/aluno/${alunoId}">${alunoId}</a>
                </li>
            `;
        }).join('');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Curso Detalhado - ${curso.designacao}</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #ffebcc; 
                            color: #e64a19;
                            margin-left: 20px;
                        }
                        h2 {
                            color: white;
                        }
                        .header {
                            background-color: #e64a19; 
                            color: white;
                            padding: 20px;
                            text-align: left;
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
                        .info {
                            margin-top: 20px;
                            font-size: 18px;
                        }
                        .info p {
                            margin: 10px 0;
                        }
                        .info a {
                            color: #ff7043;
                            text-decoration: none;
                        }
                        .info a:hover {
                            text-decoration: underline;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        ul li {
                            margin: 5px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>${curso.id} - ${curso.designacao}</h2>
                    </div>
                    <div class="content">
                        <a href="/" class="btn">Voltar para o menu inicial</a>
                        <div class="info">
                            <p><strong>Designação do Curso:</strong> ${curso.designacao}</p>
                            <p><strong>Duração:</strong> ${curso.duracao} anos</p>
                            <p>
                                <strong>Instrumento:</strong> 
                                <a href="/instrumento/${curso.instrumento.id}">${curso.instrumento.text}</a>
                            </p>
                            <p><strong>Alunos inscritos:</strong></p>
                            <ul>
                                ${alunosList}
                            </ul>
                        </div>
                    </div>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching curso data:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Error fetching curso data</h1>');
    }
};