const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    const { codigo } = req.params;

    try {
        const responseIntervencao = await axios.get(`${JSON_SERVER_URL}/intervencoes?codigo=${codigo}`);
        const intervencao = responseIntervencao.data[0]; 

        if (!intervencao) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('Intervenção não encontrada');
        }

        const responseReparacoes = await axios.get(`${JSON_SERVER_URL}/reparacoes`);
        const reparacoes = responseReparacoes.data.filter(reparacao => 
            reparacao.intervencoes.includes(codigo)
        );

        const reparacoesList = reparacoes
            .sort((a, b) => new Date(a.data) - new Date(b.data))
            .map(reparacao => `
                <li>
                    <a href="/reparacao/${reparacao.id}" class="reparacao-link">
                        Intervenção ${reparacao.id}</a>
                    que ocorreu na data <strong>${reparacao.data}</strong>
                </li>
            `).join('');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><meta charset="UTF-8"><title>Intervenção ${intervencao.codigo} - ${intervencao.nome}</title></head>
                <body>
                    <a href="/intervencoes">Voltar para a lista das intervenções</a>
                    <h1>${intervencao.nome}</h1>
                    <p><strong>Código:</strong> ${intervencao.codigo}</p>
                    <p><strong>Nome:</strong> ${intervencao.nome}</p>
                    <p><strong>Descrição:</strong> ${intervencao.descricao}</p>
                    <h2>Reparações que utilizaram esta intervenção:</h2>
                    <ul>${reparacoesList}</ul>

                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Erro ao buscar detalhes da intervenção');
    }
};