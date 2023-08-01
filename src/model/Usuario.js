const DataBase = require('../../config/db');
const db = new DataBase;

class Usuario {

    async insereUsuarioDB(nome, email, senha, incdate) {
        try {
            const sql = `INSERT INTO usuarios (user_nome, user_email, user_senha, user_incdate) VALUES (?, ?, ?, ?);`;
            const values = [nome, email, senha, incdate];
            const data = await db.pool.query(sql, values);
            console.log('Usuário inserido com sucesso!');
            return data; // Se necessário, você pode retornar os dados inseridos ou outra informação relevante
        } catch (error) {
            return { erro: error, msg: `Erro ao salvar usuário no banco.` };
        }
    }
    
    async deleteUsuarioDB(id) {
        try {
            const sql = `DELETE FROM usuarios WHERE id = ?;`;
            const values = [id];
            const data = await db.pool.query(sql, values);
            console.log('Usuário deletado com sucesso!');
            return data; // Se necessário, você pode retornar os dados afetados ou outra informação relevante
        } catch (error) {
            return { erro: error, msg: `Erro ao deletar usuário do banco.` };
        }
    }
    
        async alterarUsuarioDB(id, nome, email, senha) {
            try {
                const sql = `UPDATE usuarios SET user_nome = ?, user_email = ?, user_senha = ? WHERE user_id = ?;`;
                const values = [nome, email, senha, id];
                const data = await db.pool.query(sql, values);
                console.log('Usuário alterado com sucesso!');
                return data; // Se necessário, você pode retornar os dados afetados ou outra informação relevante
            } catch (error) {
                console.error('Erro ao alterar usuário no banco:', error);
                return { erro: error, msg: `Erro ao alterar usuário no banco.` };
            }
        }

    async buscarUsuariosDB() {
        try {
            const sql = `SELECT * FROM usuarios;`;
            const data = await db.pool.query(sql);
            console.log('Usuários encontrados:', data);
            return data; // Se necessário, você pode retornar os dados encontrados ou outra informação relevante
        } catch (error) {
            console.error('Erro ao buscar usuários no banco:', error);
            return { erro: error, msg: `Erro ao buscar usuários no banco.` };
        }
    }

    async buscarUsuariosByIDNomeDB(nome) {
        try {
            const sql = `SELECT * FROM usuarios WHERE user_nome = ?;`;
            const data = await db.pool.query(sql, nome);
            console.log(`O usuário ${nome} está cadastrado`, data);
            return data[0]; // Se necessário, você pode retornar os dados encontrados ou outra informação relevante
        } catch (error) {
            console.error('Erro ao buscar usuários no banco:', error);
            return { erro: error, msg: `Erro ao buscar usuários no banco.` };
        }
    }
}

module.exports = Usuario;