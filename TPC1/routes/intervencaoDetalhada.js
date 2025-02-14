const express = require('express');
const axios = require('axios');
const router = express.Router();
const JSON_SERVER_URL = 'http://localhost:5000';

// Specific intervention route
router.get('/:codigo', async (req, res) => {
    const { codigo } = req.params; // Get the `codigo` from the URL
    try {
        // Fetch the specific intervention using its `codigo`
        const response = await axios.get(`${JSON_SERVER_URL}/intervencoes?codigo=${codigo}`);
        const intervencao = response.data[0]; // Assuming `codigo` is unique

        if (!intervencao) {
            return res.status(404).send('Intervention not found');
        }

        // Render the intervention details page
        res.send(`
            <html>
                <head><title>Intervention ${intervencao.codigo} - ${intervencao.nome}</title></head>
                <body>
                <a href="/intervencoes">Voltar para a lista das intervenções</a>
                <h1>${intervencao.nome}</h1>
                    <p><strong>Codigo:</strong> ${intervencao.codigo}</p>
                    <p><strong>Nome:</strong> ${intervencao.nome}</p>
                    <p><strong>Descricao:</strong> ${intervencao.descricao}</p>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching intervention details');
    }
});

module.exports = router;
