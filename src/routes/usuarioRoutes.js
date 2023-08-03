const express = require('express');
const userRoute = express.Router();

const userCtrl = require('../controller/usuarioCtrl');

userRoute.post('/novo-usuario', userCtrl.insereUsuario);
userRoute.post('/usuario-by-nome', userCtrl.buscarUsuariosByIDNome);
userRoute.post('/usuario-by-email', userCtrl.buscarUsuariosByEmail);
userRoute.get('/buscar-todos', userCtrl.buscarUsuarios);
userRoute.delete('/deleta-usuario/:userId', userCtrl.deletaUsuario);
userRoute.put('/altera-usuario', userCtrl.alteraUsuario);
userRoute.put('/altera-senha', userCtrl.alteraSenhaUsuario);

module.exports = userRoute;