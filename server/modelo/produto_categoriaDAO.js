
const db = require("../dbConfig");
const { log } = require("console");

class Produto_CategoriaDAO{
    async inserir(id_produto, id_categoria) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO produto_categoria(id_produto, id_categoria) VALUES ($1, $2) RETURNING *`;
        let values = [id_produto, id_categoria];
        
        try {
            const res = await db.query(queryString, values)
            return res
        } catch (err) {
            console.log(err.stack)
        }
        //console.log("Dados inseridos");
    }

    async deletar(id1, id2){

        let queryString = `DELETE FROM produto_categoria WHERE id_produto = $1 AND id_categoria = $2 RETURNING *`;
        try {
            const res = await db.query(queryString, [id1, id2])
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM produto_categoria`;
        
        try {
            let results = await db.query(queryString);
        
            //console.log("Dados obtidos:", results.rows);
            return results.rows;
            
        } catch (err) {
            console.error(err.message);
        }

    }

    async obter(id1, id2){
        let queryString = `SELECT * FROM produto_categoria WHERE id_produto = $1 AND id_categoria = $2`;
        let results;   
        
        try {
           
            results = await db.query(queryString, [id1, id2]);

            console.log("Dados obtidos: ", results.rows);
            return results.rows;

        } catch (err) {
            console.error(err.message);
        }
        
    }

    async obterCategoriasDoProduto(id_produto){
        let queryString = `SELECT cat.id, cat.descricao FROM public.produto_categoria AS pc, public.categoria AS cat WHERE pc.id_categoria = cat.id AND pc.id_produto = $1`;
        let results;   
        
        try {
           
            results = await db.query(queryString, [id_produto]);

            //console.log("DAO Dados obtidos: ", results.rows);
            return results.rows;

        } catch (err) {
            console.error(err.message);
        }
        
    }

    async obterProdutosDaCategoria(id_categoria){
        let queryString = `SELECT p.id, p.descricao, p.preco, p.quantidade 
                           FROM public.produto_categoria AS pc, public.categoria AS cat, public.produto AS p 
                           WHERE pc.id_categoria = cat.id AND pc.id_produto = p.id AND pc.id_categoria = $1`;
        let results;   
        
        try {
           
            results = await db.query(queryString, [id_categoria]);

            //console.log("DAO Dados obtidos: ", results.rows);
            return results.rows;

        } catch (err) {
            console.error(err.message);
        }
        
    }

}

module.exports = new Produto_CategoriaDAO();
