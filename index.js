const express = require("express");
const cors    = require("cors");
const userRoutes  = require('./src/routes/usuarioRoutes');
const app     = express();
const PORT    = 3002;
require('dotenv').config();
require("./config/db");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send({ message: 'Server is running' });
});

app.use('/', userRoutes);

app.use((req, res, next) => {
    const erro = new Error('route not found');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        erro: {
            erro: error.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
