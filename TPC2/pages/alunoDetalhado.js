const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    try {
        const alunoId = req.params.id;
        const response = await axios.get(`${JSON_SERVER_URL}/alunos/${alunoId}`);
        const aluno = response.data;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Aluno - ${aluno.nome}</title>
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
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>${aluno.id} - ${aluno.nome}</h2>
                    </div>
                    <div class="content">
                        <a href="/" class="btn">Voltar para o menu inicial</a>
                        <div class="info">
                            <p><strong>Nome:</strong> ${aluno.nome}</p>
                            <p><strong>Data de Nascimento:</strong> ${aluno.dataNasc}</p>
                            <p>
                                <strong>Curso:</strong> 
                                <a href="/curso/${aluno.curso}">${aluno.curso}</a>
                            </p>
                            <p>
                                <strong>Ano de Curso:</strong> ${aluno.anoCurso}
                            </p>
                            <p>
                                <strong>Instrumento:</strong> 
                                <a href="/instrumento/${aluno.instrumento.id}">${aluno.instrumento.text}</a>
                            </p>
                        </div>
                    </div>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching aluno data:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Error fetching aluno data</h1>');
    }
};