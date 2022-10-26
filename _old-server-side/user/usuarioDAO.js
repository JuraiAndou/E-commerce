//import Usuario from "./usuario";

const {pool} = require("../dbConfig");
const { log } = require("console");


class UsuarioDAO{

    /* Obter todos os usuários */

    async inserir(nome, endereco, email, login, senha, res, req) {
        pool.query(
            `INSERT INTO usuario (nome, endereco, email, login, senha, administrador)
            VALUES ($1, $2, $3, $4, $5, false)
            RETURNING id, senha`, [nome, endereco, email, login, senha], (err, results) => {
                if (err){
                    console.log(err)
                }
                console.log(results.rows)
            }
        )
        
        //*/
        /*
        await db.connect();
        await db.query(queryString, values);
        await db.end();
        //*/
        console.log("Dados inseridos");
    }

    async deletar(id){

        let queryString = `DELETE FROM usuario WHERE id = $1`;
        /*
        await db.connect();
        await db.query(queryString, [id]);
        await db.end();
        //*/
        try {
            await db.connect();
            const res = await db.query(queryString, [id])
            console.log(res.rows)
            await db.end();
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM usuario`;
        
        await db.connect();
        let results = await db.query(queryString);
        await db.end();
        
        console.log("Dados obtidos:", results.rows);
        return results.rows;
    }

    async obter(id){
        let queryString = `SELECT * FROM usuario WHERE id = $1`;
        let results;
                
        await db.connect();
        results = await db.query(queryString, [id]);
        await db.end();

        console.log("Dados obtidos: ", results.rows);
        //let u = new usuario.Usuario(id, results.rows[0].nome, results.rows[0].endereco, results.rows[0].email, results.rows[0].login, results.rows[0].senha, results.rows[0].administrador);
        //return u;
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



        if(results.rows[0] === senha){
            return true;
        }
        return false;
    }
}

module.exports = UsuarioDAO
//udao = new UsuarioDAO();

//udao.inserir("bangus", "rua bingus", "bangus@bingus.bin", "bangusLog", "bangusPass")
//udao.deletar(2);

//var result = udao.obter(1);

//console.log(result);
//*/
//udao.atualizar(1, "bingus", "rua bingus", "bingus@bingus.bin", "bingusLog", "bingusPass");

//console.log("Testes: ", udao.confereSenha(10, "bingusPass"));
