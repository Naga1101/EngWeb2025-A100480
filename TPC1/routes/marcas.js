const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    try {
        const response = await axios.get(`${JSON_SERVER_URL}/viaturas`);
        const viaturas = response.data;
        const marcas = [...new Set(viaturas.map(viatura => viatura.marca))];

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><meta charset="UTF-8"><title>Lista de Marcas</title></head>
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
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Erro ao buscar marcas</h1>');
    }
};