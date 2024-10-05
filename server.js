const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routerEnvelop = require('./helpers/budget_envelope.js');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/envelops', routerEnvelop);

app.get('/', (req, res, next) => {
    res.send("<h1>Conection OK</h1>");
});

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});