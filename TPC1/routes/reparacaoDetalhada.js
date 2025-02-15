const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const responsereparacao = await axios.get(`${JSON_SERVER_URL}/reparacoes?id=${id}`);
        const reparacao = responsereparacao.data[0];

        if (!reparacao) {
            return res.status(404).send('Reparação not found');
        }

        const intervencoesSorted = reparacao.intervencoes.sort((a, b) => a.localeCompare(b));

        res.send(`
            <html>
                <head><title>Reparação ${reparacao.id}</title></head>
                <body>
                    <a href="/reparacoes">Voltar para a lista das reparações</a>
                    <h1>Reparação ${reparacao.id}</h1>
                    <p><strong>Data:</strong> ${reparacao.data}</p>
                    <p><strong>Nome:</strong> ${reparacao.nome}</p>
                    <p><strong>NIF:</strong> ${reparacao.nif}</p>
                    <p><strong>Viatura reparada:<a href="/viatura/${reparacao.viatura}" class="viatura-link"> ${reparacao.viatura}</a></p>
                    <h2>Intervenções realizadas (${reparacao.nr_intervencoes}):</h2>
                    <ul>
                        ${intervencoesSorted.map(codigo => `
                            <li>
                                <a href="/intervencao/${codigo}" class="intervencao-link">
                                        Intervenção: ${codigo}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching Reparação details');
    }
});

module.exports = router;