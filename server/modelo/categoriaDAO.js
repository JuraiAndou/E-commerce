
const db = require("../dbConfig");
const { log } = require("console");

class CategoriaDAO{
    async inserir(descricao) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO categoria(descricao) VALUES ($1) RETURNING *`;
        let values = [descricao];
        
        try {
            //await db.connect();
            const res = await db.query(queryString, values)
            //console.log(res)
            //await db.end();
            return res
        } catch (err) {
            console.log(err.stack)
        }
        console.log("Dados inseridos");
    }

    async deletar(id){

        let queryString = `DELETE FROM categoria WHERE id = $1`;
        try {
            //await db.connect();
            const res = await db.query(queryString, [id])
            //console.log(res.rows)
            //await db.end();
            return res;
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM categoria`;
        
        /*
        await db.connect();
        let results = await db.query(queryString);
        await db.end();
        
        console.log("Dados obtidos:", results.rows);
        return results.rows;
        */
        //await db.connect();
        
        
        try {
            let results = await db.query(queryString);
            //console.log("Dados obtidos:", results.rows);
            return results.rows;
        } catch (err) {
            console.error(err.message);
        }
        

    }

    async obter(id){
        let queryString = `SELECT * FROM categoria WHERE id = $1`;
        let results;
        
        try {
            results = await db.query(queryString, [id]);

            //console.log("Dados obtidos: ", results.rows);
            return results.rows;

        } catch (err) {
            console.error(err.message);
        }
        
    }

    async atualizar(descricao, id){
        let queryString = `UPDATE categoria SET descricao = $1 WHERE id = $2 RETURNING *`;
        let values = [descricao, id];
        let results;

        try {
            //await db.connect();
            const res = await db.query(queryString, values);
            //await db.end();
            console.log("Dados atualizados");
            return res
        } catch (err) {
            console.error(err.message);
        }

        
    }

}



module.exports = new CategoriaDAO();

//cdao = new CategoriaDAO();

//cdao.inserir("Cartas de monstro");
//cdao.obterTodos().then(x => console.log(x))