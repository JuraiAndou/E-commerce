
const db = require("../dbConfig");

class ProdutoDAO{
    async inserir(descricao, preco, foto, quantidade) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO produto(descricao, preco, foto, quantidade) VALUES ($1, $2, $3, $4)`;
        let values = [descricao, preco, foto, quantidade];

        
        try {
            
            const res = await db.query(queryString, values)
            console.log(res)
            
        } catch (err) {
            console.log(err.stack)
        }
        console.log("Dados inseridos");
    }

    async deletar(id){

        let queryString = `DELETE FROM produto WHERE id = $1`;lt
        try {

            const res = await db.query(queryString, [id])
            console.log(res.rows)

        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM produto`;
   
        try {
            let results = await db.query(queryString);
            //console.log("Dados obtidos:", results.rows);
            return results.rows;
        } catch (err) {
            console.error(err.message);
        }
        
        
    }

    async obter(id){
        let queryString = `SELECT * FROM produto WHERE id = $1`;
        let results;
        try {
            results = await db.query(queryString, [id]);

            console.log("Dados obtidos: ", results.rows);
            return results.rows[0];
        } catch (err) {
            console.error(err.message);
        }
        
    }

    async atualizar(descricao, preco, foto, quantidade){
        let queryString = `UPDATE produto SET descricao = $2, preco = $3, foto = $4, quantidade = $5 WHERE id = $1`;
        let values = [descricao, preco, foto, quantidade];
        let results;
        try {
            results = await db.query(queryString, values);
            console.log("Dados atualizados");
            return results;
        } catch (err) {
            console.error(err.message);
        }

        
    }

    async atualizarQuantidade(id, qntd){
        let queryString = `UPDATE produto SET quantidade = $2 WHERE id = $1`;
        let values = [id, qntd];
        let results;
        try {
            const currentProd = await this.obter(id)
            console.log("Dentro DAO: ");
            console.log(currentProd);
            console.log(currentProd.quantidade, qntd);

            results = await db.query(queryString, [id, currentProd.quantidade - qntd]);
            console.log("Dados atualizados");
            return results;
        } catch (err) {
            console.error(err.message);
        }

        
    }

    async obterOutEstoque(){
        const produtos = await this.obterTodos()
        let produtoOut = []
        for (let i = 0; i < produtos.length; i++){
            if (produtos[i].quantidade == 0){
                var result = [produtos[i].id, produtos[i].descricao, produtos[i].preco]
                produtoOut.push(result)
            }
        }
        
        return produtoOut
    }
}


module.exports = new ProdutoDAO;