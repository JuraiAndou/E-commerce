
const db = require("./dbConfig");
const { log } = require("console");

class Produto_CategoriaDAO{
    async inserir(id_produto, id_categoria) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO produto_categoria(id_produto, id_categoria) VALUES ($1, $2)`;
        let values = [id_produto, id_categoria];

        
        try {
            await db.connect();
            const res = await db.query(queryString, values)
            console.log(res)
            await db.end();
        } catch (err) {
            console.log(err.stack)
        }
        console.log("Dados inseridos");
    }

    async deletar(id1, id2){

        let queryString = `DELETE FROM produto_categoria WHERE id_produto = $1 AND id_categoria = $2`;
        try {
            await db.connect();
            const res = await db.query(queryString, [id1, id2])
            console.log(res.rows)
            await db.end();
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM produto_categoria`;
        
        await db.connect();
        let results = await db.query(queryString);
        await db.end();
        
        console.log("Dados obtidos:", results.rows);
        return results.rows;
    }

    async obter(id1, id2){
        let queryString = `SELECT * FROM produto_categoria WHERE id_produto = $1 AND id_categoria = $2`;
        let results;
                
        await db.connect();
        results = await db.query(queryString, [id1, id2]);
        await db.end();

        console.log("Dados obtidos: ", results.rows);
        return results.rows;
        
    }

}

//pdao = new Produto_CategoriaDAO();

//pdao.inserir(3, 2);

