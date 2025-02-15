const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/viaturas`);
        const viaturas = response.data;

        const marcas = [...new Set(viaturas.map(viatura => viatura.marca))];

        res.send(`
            <html>
                <head><title>Lista de Marcas</title></head>
                <body>
                    <a href="/">Voltar para o menu inicial</a>
                    <h1>Lista de Marcas</h1>
                    <ul>
                        ${marcas.map(marca => `
                            <li>
                                <a href="/marca/${marca}" class="marca-link">${marca}</a>
                            </li>
                        `).join('')}
                    </ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching marcas');
    }
});

module.exports = router;
