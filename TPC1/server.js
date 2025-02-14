const express = require('express');
const path = require('path');
const routeReparacoes = require('./routes/reparacoes');
const routeIntervencoes = require('./routes/intervencoes');
const routeIntervencaoDetalhada = require('./routes/intervencaoDetalhada');
const routeViaturas = require('./routes/viaturas');
const app = express();
const PORT = 3000;

// Serve static files (like HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes for reparacoes, intervencoes, and viaturas
app.use('/reparacoes', routeReparacoes);
app.use('/intervencoes', routeIntervencoes);
app.use('/intervencao', routeIntervencaoDetalhada);
app.use('/viaturas', routeViaturas);

// Main page route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Inicio</title></head>
            <body>
                <h1>Serviço de Reparações Automóveisa</h1>
                <ul>
                    <li><a href="/intervencoes">Tipos de Intervenção</a></li>
                    <li><a href="/reparacoes">Lista de Reparações</a></li>
                    <li><a href="/viaturas">Listagem das Marcas e Modelos dos Carros</a></li>
                </ul>
            </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});