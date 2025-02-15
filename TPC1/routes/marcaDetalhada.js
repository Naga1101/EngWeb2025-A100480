const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

router.get('/:marca', async (req, res) => {
    const { marca } = req.params; 
    try {
        const responseViaturas = await axios.get(`${JSON_SERVER_URL}/viaturas?marca=${marca}`);
        const viaturas = responseViaturas.data;

        if (!viaturas.length) {
            return res.status(404).send('No viaturas found for this marca');
        }

        res.send(`
            <html>
                <head><title>Viaturas da Marca ${marca}</title></head>
                <body>
                    <a href="/marcas">Voltar para a lista das marcas</a>
                    <h1>Viaturas da Marca ${marca}</h1>
                    <ul>
                        ${viaturas.map(viatura => `
                            <li>
                                Modelo <a href="/viatura/${viatura.matricula}" class="viatura-link">  ${viatura.modelo}</a>
                            </li>
                        `).join('')}
                    </ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching viaturas for marca');
    }
});

module.exports = router;
