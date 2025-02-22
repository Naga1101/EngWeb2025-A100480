const http = require('http');
const axios = require('axios');
const PORT = 3000;
const JSON_SERVER_URL = 'http://localhost:5000';

const server = http.createServer((req, res) => {    
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Inicio</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #ffebcc; 
                            color: #e64a19; 
                        }
                        .header {
                            background-color: #e64a19; 
                            color: white;
                            padding: 20px;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 36px;
                        }
                        .nav-bar {
                            display: flex; 
                            justify-content: center; 
                            list-style: none;
                            padding: 0;
                            margin-top: 20px;
                        }
                        .nav-bar li {
                            margin: 0 15px;
                        }
                        .nav-bar a {
                            text-decoration: none;
                            color: #ffffff; 
                            padding: 12px 24px;
                            background-color: #ff7043; 
                            border-radius: 8px;
                            transition: background-color 0.3s;
                        }
                        .nav-bar a:hover {
                            background-color: #e65100; 
                        }
                        .content {
                            padding: 20px;
                            text-align: center;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .animate-fadeIn {
                            animation: fadeIn 1s ease-out;
                        }
                    </style>
                </head>
                <body>
                    <div class="header animate-fadeIn">
                        <h1>Escola de Música</h1>
                    </div>
                    <div class="content">
                        <ul class="nav-bar">
                            <li><a href="/cursos">Listar todos os cursos existentes</a></li>
                            <li><a href="/instrumentos">Listar todos os instrumentos disponíveis</a></li>
                            <li><a href="/alunos">Listar todos os alunos matriculados na escola</a></li>
                        </ul>
                    </div>
                </body>
            </html>
        `);
    } else if (req.url === '/cursos' && req.method === 'GET') {
        require('./pages/cursos')(req, res); 
    } else if (req.url.startsWith('/curso/') && req.method === 'GET') {
        const id = req.url.split('/')[2];  
        req.params = { id }; 
        require('./pages/cursoDetalhado')(req, res);
    } else if (req.url === '/instrumentos' && req.method === 'GET') {
        require('./pages/instrumentos')(req, res); 
    } else if (req.url.startsWith('/instrumento/') && req.method === 'GET') {
        const id = req.url.split('/')[2];  
        req.params = { id }; 
        require('./pages/instrumentoDetalhado')(req, res);
    } else if (req.url === '/alunos' && req.method === 'GET') {
        require('./pages/alunos')(req, res);
    } else if (req.url.startsWith('/aluno/') && req.method === 'GET') {
        const id = req.url.split('/')[2];  
        req.params = { id }; 
        require('./pages/alunoDetalhado')(req, res);
    } else {
        res.writeHead(404);
        res.end('<h1>404 - Page not found</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
