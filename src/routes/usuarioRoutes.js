const express = require('express');
const userRoute = express.Router();

const userCtrl = require('../controller/usuarioCtrl');

userRoute.post('/novo-usuario', userCtrl.insereUsuario);
userRoute.get('/buscar-todos', userCtrl.buscarUsuarios);
userRoute.delete('/deleta-usuario/:userId', userCtrl.deletaUsuario);

module.exports = userRoute;