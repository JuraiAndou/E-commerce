
const db = require("../dbConfig");
const { log } = require("console");

class VendaDAO{
    async inserir(data, id_usuario) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO venda(data, id_usuario) VALUES ($1, $2) RETURNING * `;
        let values = [data, id_usuario];
        try {
            const res = await db.query(queryString, values)
            console.log(res)

        } catch (err) {
            console.log(err.stack)
        }
        console.log("Dados inseridos");
    }

    async deletar(id){

        let queryString = `DELETE FROM venda WHERE id = $1 RETURNING *`;
        try {
            const res = await db.query(queryString, [id])
            console.log(res.rows)
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM venda`;
        try {
            let results = await db.query(queryString);
            return results.rows;
        } catch (err) {
            console.log(err.stack)
        }
    
    }
    async obter(id){
        let queryString = `SELECT * FROM venda WHERE id = $1`;
        let results;
                
        try {
            results = await db.query(queryString, [id]);
            return results.rows;
        } catch (err) {
            console.log(err.stack)
        }   
    }

    async atualizar(data, id_usuario){
        let queryString = `UPDATE venda SET data = $2, id_usuario = $3 WHERE id = $1 RETURNING *`;
        let values = [data, id_usuario];
        let results;
        
        try {
            await db.query(queryString, values);
            console.log("Dados atualizados")
        } catch (err) {
            console.log(err.stack)
        }
      ;
    }
    
    async getVendasPerUser(id_user){
        let queryString = `Select venda.id, users.user_name ,venda.data from users inner join venda on venda.id_user = users.user_id where users.user_id = $1;`
        let values = [id_user]
        let results

        try {
            results = await db.query(queryString, values);
            return results.rows;
        } catch (err) {
            console.log(err.stack)
        }
    }
}

module.exports = new VendaDAO;