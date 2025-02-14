const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

// Intervention list route
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/intervencoes`);
        const intervencoes = response.data;

        const interventionsList = intervencoes
            .sort((a, b) => a.codigo.localeCompare(b.codigo))
            .map(intervencao => `
                <li>
                    Code: ${intervencao.codigo}, Name: ${intervencao.nome}, 
                    Description: ${intervencao.descricao}
                </li>
            `).join('');

        res.send(`
            <html>
                <head><title>Listagem dos Tipos de Intervenção</title></head>
                <body>
                    <h1>Listagem dos Tipos de Intervenção</h1>
                    <ul>${interventionsList}</ul>
                    <a href="/">Back to main page</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching interventions');
    }
});

module.exports = router;