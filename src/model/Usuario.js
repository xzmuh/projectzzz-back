const DataBase = require('../../config/db');
const db = new DataBase;

class Usuario {

    async insereUsuario(nome, email, senha) {
        try {
            const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);`;
            const values = [nome, email, senha];
            const data = await db.pool.query(sql, values);
            console.log('Usuário inserido com sucesso!');
            return data; // Se necessário, você pode retornar os dados inseridos ou outra informação relevante
        } catch (error) {
            return { erro: error, msg: `Erro ao salvar usuário no banco.` };
        }
    }
    
    async deleteUsuario(id) {
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

    async buscarUsuarios() {
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

    async alterarUsuario(id, nome, email, senha) {
        try {
            const sql = `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?;`;
            const values = [nome, email, senha, id];
            const data = await db.pool.query(sql, values);
            console.log('Usuário alterado com sucesso!');
            return data; // Se necessário, você pode retornar os dados afetados ou outra informação relevante
        } catch (error) {
            console.error('Erro ao alterar usuário no banco:', error);
            return { erro: error, msg: `Erro ao alterar usuário no banco.` };
        }
    }

}