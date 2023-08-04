const DataBase = require('../../config/db');
const Usuario  = require('../model/Usuario');
const bcrypt = require('bcrypt');

const db   = new DataBase;
const user = new Usuario;

function sendResponse(res, statusCode, dados) {
    res.status(statusCode).json(dados);
}

async function insereUsuario(req, res) {
    const {user_nome, user_email, user_senha} = req.body;

    const emailExistente = await user.buscarUsuariosByEmailDB(user_email);
    
    if (!emailExistente.length) {
        const senhaCodficada = await encodePassword(user_senha);
        
        const data = await user.insereUsuarioDB(user_nome, user_email, senhaCodficada);
        console.log("Insere", data);
        if(!data.error) {
            sendResponse(res, 200, data);
        } else {
            sendResponse(res, 500, data);
        }
    } else {
        let messageError = {alert: "Este e-mail já está cadastrado, tente outro!"};
        sendResponse(res, 200, messageError)
    }
}

async function deletaUsuario(req, res) {
    const {userId} = req.params;
    const data = await user.deletaUsuarioDB(userId);

    if(!data.error) {
        sendResponse(res, 200, data);
    } else {
        sendResponse(res, 500, data);
    }
}

async function alteraUsuario(req, res) {
    const {user_id, user_nome, user_email, user_senha} = req.body;

    const senhaCodficada = await encodePassword(user_senha);

    const data = await user.alterarUsuarioDB(user_id, user_nome, user_email, senhaCodficada);

    if(!data.error) {
        sendResponse(res, 200, data);
    } else {
        sendResponse(res, 500, data);
    }
}

async function buscarUsuarios(req, res) {
    const data = await user.buscarUsuariosDB();

    if(!data.error) {
        sendResponse(res, 200, data[0]);
    } else {
        sendResponse(res, 500, data);
    }
}

async function buscarUsuariosByIDNome(req, res) {
    const {user_nome} = req.body;
    // const nome = req.body.user_nome;
    const data = await user.buscarUsuariosByIDNomeDB(user_nome);

    if(!data.error) {
        sendResponse(res, 200, data);
    } else {
        sendResponse(res, 500, data);
    }
}

async function buscarUsuariosByEmail(req, res) {
    const {user_email} = req.body;
    // const email = req.body.user_email;
    const data = await user.buscarUsuariosByEmailDB(user_email);

    if(data.error) {
        sendResponse(res, 500, data);
    } else if (data.length) {
        sendResponse(res, 200, {msg: `E-mail encontrado!`});
    } else if (!data.length) {
        sendResponse(res, 200, {msg: `E-mail não encontrado!`});
    }
}

async function encodePassword(senha) {
    try {
        const hash = await bcrypt.hash(senha, 10);
        return hash
    } catch (error) {
        return {erro: error, msg: 'Erro ao codificar a senha.'}
    }
}

async function alteraSenhaUsuario(req, res) {
    const {user_id, nova_senha} = req.body;
    
    const novaSenhaCodficada = await encodePassword(nova_senha);
    if (novaSenhaCodficada) {
        const novaSenha = await user.alteraSenhaDB(user_id, novaSenhaCodficada);
        if (novaSenha) {
            const response = {success: true, msg: `Senha alterada com sucesso!`}
            sendResponse(res, 200, response);
            
        } else {
            sendResponse(res, 500, data);
        }
    }    
}

module.exports = {
    insereUsuario,
    deletaUsuario,
    alteraUsuario,
    alteraSenhaUsuario,
    buscarUsuarios,
    buscarUsuariosByIDNome,
    buscarUsuariosByEmail
}