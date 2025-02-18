const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    if (req.url === '/reparacoes' && req.method === 'GET') {
        try {
            const response = await axios.get(`${JSON_SERVER_URL}/reparacoes`);
            const reparacoes = response.data;

            const repairsList = reparacoes.map(reparacao => `
                <li>
                    <a href="/reparacao/${reparacao.id}" class="reparacao-link">Reparação ${reparacao.id}</a>
                    realizada a <strong>${reparacao.data}</strong> e com um total de <strong>${reparacao.nr_intervencoes}</strong> intervenções.
                </li>
            `).join('');

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><meta charset="UTF-8"><title>Lista das Reparações</title></head>
                    <body>
                        <a href="/">Voltar para o menu inicial</a>
                        <h1>Lista das Reparações</h1>
                        <ul>${repairsList}</ul>
                        <a href="/">Voltar para o menu inicial</a>
                    </body>
                </html>
            `);
        } catch (error) {
            console.error('Error fetching reparações:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao buscar reparações.');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
};