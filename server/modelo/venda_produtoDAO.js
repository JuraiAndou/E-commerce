
const db = require("./dbConfig");
const { log } = require("console");

class Venda_ProdutoDAO{
    async inserir(id_venda, id_produto, quantidade) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO venda_produto(id_venda, id_produto, quantidade) VALUES ($1, $2, $3)`;
        let values = [id_venda, id_produto, quantidade];

        
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

        let queryString = `DELETE FROM venda_produto WHERE id_venda = $1 AND id_produto = $2`;
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
        let queryString = `SELECT * FROM venda_produto`;
        
        await db.connect();
        let results = await db.query(queryString);
        await db.end();
        
        console.log("Dados obtidos:", results.rows);
        return results.rows;
    }

    async obter(id1, id2){
        let queryString = `SELECT * FROM venda_produto WHERE id_venda = $1 AND id_produto = $2`;
        let results;
                
        await db.connect();
        results = await db.query(queryString, [id1, id2]);
        await db.end();

        console.log("Dados obtidos: ", results.rows);
        return results.rows;
        
    }

    async atualizar(id_venda, id_produto, quantidade){
        let queryString = `UPDATE venda_produto SET quantidade = $3 WHERE id_venda = $1 AND id_produto = $2`;
        let values = [id_venda, id_produto, quantidade];
        let results;

        await db.connect();
        await db.query(queryString, values);
        await db.end();
        console.log("Dados atualizados");
    }

}

//vdao = new Venda_ProdutoDAO();

//vdao.inserir(1, 3, 2);
//vdao.obterTodos();

