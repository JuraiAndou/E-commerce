
const db = require("../dbConfig");

class ProdutoDAO{
    async inserir(descricao, preco, foto, quantidade) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO produto(descricao, preco, foto, quantidade) VALUES ($1, $2, $3, $4)`;
        let values = [descricao, preco, foto, quantidade];

        
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

    async deletar(id){

        let queryString = `DELETE FROM produto WHERE id = $1`;lt
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
        let queryString = `SELECT * FROM produto`;
   
        let results = await db.query(queryString);
     
        
        //console.log("Dados obtidos:", results.rows);
        return results.rows;
    }

    async obter(id){
        let queryString = `SELECT * FROM produto WHERE id = $1`;
        let results;
                
        await db.connect();
        results = await db.query(queryString, [id]);
        await db.end();

        console.log("Dados obtidos: ", results.rows);
        return results.rows;
        
    }

    async atualizar(descricao, preco, foto, quantidade){
        let queryString = `UPDATE produto SET descricao = $2, preco = $3, foto = $4, quantidade = $5 WHERE id = $1`;
        let values = [descricao, preco, foto, quantidade];
        let results;

        await db.connect();
        await db.query(queryString, values);
        await db.end();
        console.log("Dados atualizados");
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