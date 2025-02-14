const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

// Cars list route
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/viaturas`);
        const viaturas = response.data;

        const carBrands = {};

        viaturas.forEach(reparacao => {
            const marca = reparacao.viatura.marca;
            const modelo = reparacao.viatura.modelo;
            const key = `${marca} ${modelo}`;
            if (!carBrands[key]) carBrands[key] = 0;
            carBrands[key]++;
        });

        const carsList = Object.keys(carBrands)
            .sort()
            .map(car => `
                <li>${car}: ${carBrands[car]} cars</li>
            `).join('');

        res.send(`
            <html>
                <a href="/">Voltar para o menu inicial</a>
                <head><title>Listagem das Marcas e Modelos</title></head>
                <body>
                    <a href="/">Back to main page</a>
                    <h1>Listagem das Marcas e Modelos dos Carros</h1>
                    <ul>${carsList}</ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cars');
    }
});

module.exports = router;