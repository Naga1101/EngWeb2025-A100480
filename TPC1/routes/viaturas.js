const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/viaturas`);
        const viaturas = response.data;

        const viaturasList = viaturas.map(viatura => `
            <li>
                <strong>${viatura.marca} ${viatura.modelo}</strong>
                <a href="/viatura/${viatura.matricula}" class="viatura-link">(${viatura.matricula})</a>
            </li>
        `).join('');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <meta charset="UTF-8"> 
                    <title>Lista de Viaturas</title>
                </head>
                <body>
                    <a href="/">Voltar para o menu inicial</a>
                    <h1>Lista de Viaturas</h1>
                    <ul>${viaturasList}</ul>
                    <a href="/">Voltar para o menu inicial</a>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching viaturas:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Erro ao buscar viaturas</h1>');
    }
};
