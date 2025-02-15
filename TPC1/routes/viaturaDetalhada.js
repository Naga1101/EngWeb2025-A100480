const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

router.get('/:matricula', async (req, res) => {
    const { matricula } = req.params; 
    try {
        const responseViatura = await axios.get(`${JSON_SERVER_URL}/viaturas?matricula=${matricula}`);
        const viatura = responseViatura.data[0]; 

        if (!viatura) {
            return res.status(404).send('Viatura not found');
        }

        const responseReparacoes = await axios.get(`${JSON_SERVER_URL}/reparacoes?viatura=${matricula}`);
        const reparacoes = responseReparacoes.data;

        const reparacoesList = reparacoes.map(reparacao => `
            <li>
                Reparação <a href="/reparacao/${reparacao.id}" class="reparacao-link">${reparacao.id}</a> realizada a ${reparacao.data}
            </li>
        `).join('');

        res.send(`
            <html>
                <head><title>Viatura ${viatura.matricula}</title></head>
                <body>
                    <a href="/viaturas">Voltar para a lista das viaturas</a>
                    <h2>Dono: ${reparacoes.length > 0 ? reparacoes[0].nome : 'Desconhecido'}</h2>
                    <p><strong>Marca:</strong> ${viatura.marca}</p>
                    <p><strong>Modelo:</strong> ${viatura.modelo}</p>
                    <p>Matricula ${viatura.matricula}</p>
                    <h3>Reparações realizadas:</h3>
                    <ul>
                        ${reparacoesList}
                    </ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching viatura details');
    }
});

module.exports = router;
