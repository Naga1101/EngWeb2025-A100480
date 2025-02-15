const express = require('express');
const path = require('path');
const routeReparacoes = require('./routes/reparacoes');
const routeReparacaoDetalhada = require('./routes/reparacaoDetalhada');
const routeIntervencoes = require('./routes/intervencoes');
const routeIntervencaoDetalhada = require('./routes/intervencaoDetalhada');
const routeViaturas = require('./routes/viaturas');
const routeViaturaDetalhada = require('./routes/viaturaDetalhada');
const routeMarcas = require('./routes/marcas');
const routeMarcaDetalhada = require('./routes/marcaDetalhada');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/reparacoes', routeReparacoes);
app.use('/reparacao', routeReparacaoDetalhada);
app.use('/intervencoes', routeIntervencoes);
app.use('/intervencao', routeIntervencaoDetalhada);
app.use('/viaturas', routeViaturas);
app.use('/viatura', routeViaturaDetalhada);
app.use('/marcas', routeMarcas);
app.use('/marca', routeMarcaDetalhada);

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Inicio</title></head>
            <body>
                <h1>Serviço de Reparações Automóveisa</h1>
                <ul>
                    <li><a href="/intervencoes">Tipos de Intervenção</a></li>
                    <li><a href="/reparacoes">Lista de Reparações</a></li>
                    <li><a href="/marcas">Lista de Marcas</a></li>
                    <li><a href="/viaturas">Lista de todas as Viaturas</a></li>
                </ul>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});