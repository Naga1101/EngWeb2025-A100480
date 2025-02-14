const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

// Repairs list route
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/reparacoes`);
        const reparacoes = response.data;

        const repairsList = reparacoes.map(reparacao => `
            <li>
                Date: ${reparacao.data}, NIF: ${reparacao.nif}, Name: ${reparacao.nome}, 
                Car: ${reparacao.viatura}, 
                Interventions: ${reparacao.nr_intervencoes}
            </li>
        `).join('');

        res.send(`
            <html>
                <head><title>Lista das Reparações</title></head>
                <body>
                    <a href="/">Voltar para o menu inicial</a>
                    <h1>Listagem das Reparações</h1>
                    <ul>${repairsList}</ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching reparações');
    }
});

module.exports = router;