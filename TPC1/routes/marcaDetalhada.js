const axios = require('axios');
const JSON_SERVER_URL = 'http://localhost:5000';

module.exports = async (req, res) => {
    const marca = req.url.split('/')[2];
    try {
        const responseViaturas = await axios.get(`${JSON_SERVER_URL}/viaturas?marca=${marca}`);
        const viaturas = responseViaturas.data;

        if (!viaturas.length) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Nenhuma viatura encontrada para esta marca</h1>');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><meta charset="UTF-8"><title>Viaturas da Marca ${marca}</title></head>
                <body>
                    <a href="/marcas">Voltar para a lista das marcas</a>
                    <h1>Viaturas da Marca ${marca}</h1>
                    <ul>
                        ${viaturas.map(viatura => `
                            <li>
                                Modelo <a href="/viatura/${viatura.matricula}" class="viatura-link">${viatura.modelo}</a>
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
        res.end('<h1>Erro ao buscar viaturas para a marca</h1>');
    }
};