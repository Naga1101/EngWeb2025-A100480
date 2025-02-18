const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/intervencoes`);
        const intervencoes = response.data;

        const interventionsList = intervencoes
            .sort((a, b) => a.codigo.localeCompare(b.codigo))
            .map(intervencao => `
                <li>
                    <a href="/intervencao/${intervencao.codigo}" class="intervencao-link">
                        ${intervencao.codigo} ${intervencao.nome}
                    </a>
                </li>
            `).join('');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><meta charset="UTF-8"><title>Tipos de Intervenção</title></head>
                <body>
                    <a href="/">Voltar para o menu inicial</a>
                    <h1>Listagem dos Tipos de Intervenção</h1>
                    <ul>${interventionsList}</ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Erro ao buscar as intervenções');
    }
};