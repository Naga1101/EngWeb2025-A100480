const http = require('http');
const axios = require('axios');
const PORT = 3000;
const JSON_SERVER_URL = 'http://localhost:5000';

const server = http.createServer(async (req, res) => {    
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8"> 
                    <title>Inicio</title>
                </head>
                <body>
                    <h1>Serviço de Reparações Automóveis</h1>
                    <ul>
                        <li><a href="/intervencoes">Tipos de Intervenção</a></li>
                        <li><a href="/reparacoes">Lista de Reparações</a></li>
                        <li><a href="/marcas">Lista de Marcas</a></li>
                        <li><a href="/viaturas">Lista de todas as Viaturas</a></li>
                    </ul>
                </body>
            </html>
        `);
    } else if (req.url.startsWith('/intervencoes') && req.method === 'GET') {
        require('./routes/intervencoes')(req, res);
    } else if (req.url.startsWith('/intervencao/') && req.method === 'GET') {
        const codigo = req.url.split('/')[2];  
        req.params = { codigo };  
        require('./routes/intervencaoDetalhada')(req, res);
    } else if (req.url.startsWith('/reparacoes') && req.method === 'GET') {
        require('./routes/reparacoes')(req, res);
    } else if (req.url.startsWith('/reparacao/') && req.method === 'GET') {
        const id = req.url.split('/')[2];  
        req.params = { id };  
        require('./routes/reparacaoDetalhada')(req, res);
    } else if (req.url.startsWith('/viaturas') && req.method === 'GET') {
        require('./routes/viaturas')(req, res);
    } else if (req.url.startsWith('/viatura/') && req.method === 'GET') {
        const id = req.url.split('/')[2];  
        req.params = { id }; 
        require('./routes/viaturaDetalhada')(req, res);
    } else if (req.url.startsWith('/marcas') && req.method === 'GET') {
        require('./routes/marcas')(req, res);
    } else if (req.url.startsWith('/marca/') && req.method === 'GET') {
        const id = req.url.split('/')[2];  
        req.params = { id }; 
        require('./routes/marcaDetalhada')(req, res);
    } else {
        res.writeHead(404);
        res.end('<h1>404 - Rota não encontrada</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});