const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send("<h1>Hello World!!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});