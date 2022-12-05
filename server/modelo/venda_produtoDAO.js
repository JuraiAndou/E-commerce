
const db = require("../dbConfig");
const { log, error } = require("console");

class Venda_ProdutoDAO{
    async inserir(id_venda, id_produto, quantidade) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO venda_produto(id_venda, id_produto, quantidade) VALUES ($1, $2, $3) RETURNING *`;
        let values = [id_venda, id_produto, quantidade];

        try {
            const res = await db.query(queryString, values)
            //console.log(res)
            console.log("Dados inseridos");
            return res.rows
        } catch (err) {
            console.error(err.message)
        }
        
    }

    async deletar(id1, id2){

        let queryString = `DELETE FROM venda_produto WHERE id_venda = $1 AND id_produto = $2 RETURNING *`;
        try {
            const res = await db.query(queryString, [id1, id2])
            //console.log(res.rows)
            return res
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM venda_produto`;
        
        try {
            let results = await db.query(queryString);
            console.log("Dados obtidos:", results.rows);
            return results.rows;
        } catch (err) {
            console.error(err.message);
        }

        
    }

    async obter(id1, id2){
        let queryString = `SELECT * FROM venda_produto WHERE id_venda = $1 AND id_produto = $2`;
        let results;
                
        try {
            results = await db.query(queryString, [id1, id2]);
            
            console.log("Dados obtidos: ", results.rows);
            return results.rows;
        } catch (err) {
            console.error(err.message);
        }

        
        
    }

    async atualizar(id_venda, id_produto, quantidade){
        let queryString = `UPDATE venda_produto SET quantidade = $3 WHERE id_venda = $1 AND id_produto = $2 RETURNING *`;
        let values = [id_venda, id_produto, quantidade];
        let results;

        

        try {
            results = await db.query(queryString, values);
            
            console.log("Dados atualizados");
            return results
        } catch (err) {
            console.error(err.message);
        }

    }

}

module.exports = new Venda_ProdutoDAO;

//vdao = new Venda_ProdutoDAO();

//vdao.inserir(1, 3, 2);
//vdao.obterTodos();

