const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    const matricula = req.url.split('/')[2];
    try {
        const responseViatura = await axios.get(`${JSON_SERVER_URL}/viaturas?matricula=${matricula}`);
        const viatura = responseViatura.data[0];

        if (!viatura) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Viatura não encontrada</h1>');
            return;
        }

        const responseReparacoes = await axios.get(`${JSON_SERVER_URL}/reparacoes?viatura=${matricula}`);
        const reparacoes = responseReparacoes.data;

        const reparacoesList = reparacoes.map(reparacao => `
            <li>
                Reparação <a href="/reparacao/${reparacao.id}" class="reparacao-link">${reparacao.id}</a> realizada a ${reparacao.data}
            </li>
        `).join('');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><meta charset="UTF-8"><title>Viatura ${viatura.matricula}</title></head>
                <body>
                    <a href="/viaturas">Voltar para a lista de viaturas</a>
                    <h2>Dono: ${reparacoes.length > 0 ? reparacoes[0].nome : 'Desconhecido'}</h2>
                    <p><strong>Marca:</strong> ${viatura.marca}</p>
                    <p><strong>Modelo:</strong> ${viatura.modelo}</p>
                    <p><strong>Matricula:</strong> ${viatura.matricula}</p>
                    <h3>Reparações realizadas:</h3>
                    <ul>
                        ${reparacoesList}
                    </ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching viatura details:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Erro ao buscar detalhes da viatura</h1>');
    }
};