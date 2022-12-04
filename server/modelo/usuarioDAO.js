//import Usuario from "./usuario";

const usuario = require("./usuario");
const db = require("../dbConfig");
const { log } = require("console");
const vendas = require("./vendaDAO")

class UsuarioDAO{

    /* Obter todos os usuários */

    async inserir(nome, endereco, email, login, senha) {

        let queryString = `INSERT INTO usuario(nome, endereco, email, login, senha, administrador) VALUES ($1, $2, $3, $4, $5, $6)`;
        let values = [nome, endereco, email, login, senha, false];

        
        try {
            await db.connect();
            const res = await db.query(queryString, values)

            await db.end();
            console.log("deu bom");
        } catch (err) {
            console.log("deu ruim");
            console.log(err.stack)
        }
        

        console.log("Dados inseridos");
    }

    async deletar(id){

        let queryString = `DELETE FROM usuario WHERE id = $1`;
   
        try {
            await db.connect();
            const res = await db.query(queryString, [id])

            await db.end();
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM users`;
        
        let results = await db.query(queryString);

        return results.rows;
    }

    async obter(id){
        let queryString = `SELECT * FROM user WHERE user_id = $1`;
        let results;
                
        await db.connect();
        results = await db.query(queryString, [id]);
        await db.end();
        return results.rows;
        
    }

    async atualizar(id, nome, endereco, email, login, senha){
        let queryString = `UPDATE usuario SET nome = $2, endereco = $3, email = $4, login = $5, senha = $6, administrador = $7 WHERE id = $1`;
        let values = [id, nome, endereco, email, login, senha, false];
        let results;

        await db.connect();
        await db.query(queryString, values);
        await db.end();
        console.log("Dados atualizados");
    }

    async confereSenha(id, senha){
        let queryString = `SELECT * FROM usuario WHERE id = $1`;
        let results;
                
        await db.connect();
        results = await db.query(queryString, [id]);
        await db.end();


        if(results.rows[0].senha === senha){
            return true;
        }
        return false;
    }

    async obterComprasPerUser(){
        let users = await this.obterTodos()
        let vendasPerUser = []
        let comprasPerCliente = 0
        
        for (let i = 0; i < users.length; i++){
            const compra = await vendas.getVendasPerUser(users[i].user_id)
            
            for (let j = 0; j < compra.length; j++){
                
                if (compra[j].data >= new Date('2022-11-03T03:00:00.000Z')){
                    comprasPerCliente += 1
                }
            }
           
            var result = [users[i].user_id, users[i].user_name, comprasPerCliente]
            vendasPerUser.push(result)

            comprasPerCliente = 0 
        } 
        return vendasPerUser
    }
}


module.exports = new UsuarioDAO;

