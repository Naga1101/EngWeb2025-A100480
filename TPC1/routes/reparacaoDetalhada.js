const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    const urlParts = req.url.split('/');
    const id = urlParts[2]; 

    if (urlParts[1] === 'reparacao' && id && req.method === 'GET') {
        try {
            const response = await axios.get(`${JSON_SERVER_URL}/reparacoes?id=${id}`);
            const reparacao = response.data[0];

            if (!reparacao) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Reparação não encontrada');
                return;
            }

            const intervencoesSorted = reparacao.intervencoes ? reparacao.intervencoes.sort((a, b) => a.localeCompare(b)) : [];

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><meta charset="UTF-8"><title>Reparação ${reparacao.id}</title></head>
                    <body>
                        <a href="/reparacoes">Voltar para a lista das reparações</a>
                        <h1>Reparação ${reparacao.id}</h1>
                        <p><strong>Data:</strong> ${reparacao.data}</p>
                        <p><strong>Nome:</strong> ${reparacao.nome}</p>
                        <p><strong>NIF:</strong> ${reparacao.nif}</p>
                        <p><strong>Viatura reparada:</strong> <a href="/viatura/${reparacao.viatura}" class="viatura-link">${reparacao.viatura}</a></p>
                        <h2>Intervenções realizadas (${reparacao.nr_intervencoes}):</h2>
                        <ul>
                            ${intervencoesSorted.map(codigo => `
                                <li>
                                    <a href="/intervencao/${codigo}" class="intervencao-link">Intervenção: ${codigo}</a>
                                </li>
                            `).join('')}
                        </ul>
                        <a href="/">Voltar para o menu inicial</a>
                    </body>
                </html>
            `);
        } catch (error) {
            console.error('Error fetching reparação details:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao buscar detalhes da reparação.');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
};