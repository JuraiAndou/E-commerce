
const db = require("./dbConfig");
const { log } = require("console");

class VendaDAO{
    async inserir(data, id_usuario) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO venda(data, id_usuario) VALUES ($1, $2) RETURNING * `;
        let values = [data, id_usuario];
        try {
            
            const res = await db.query(queryString, values)
            console.log(res)
            return res
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
            return res
        } catch (err) {
            console.log(err.stack)
        }
        
        console.log("Dados deletados");
    }

    async obterTodos(){
        let queryString = `SELECT * FROM venda`;
       
        try {
            let results = await db.query(queryString);
            //console.log("Dados obtidos:", results.rows);
            return results.rows;
                
        } catch (err) {
            console.error(err.message);
        }

    }

    async obter(id){
        let queryString = `SELECT * FROM venda WHERE id = $1`;
        let results;
                
        try {
            results = await db.query(queryString, [id]);
            //console.log("Dados obtidos: ", results.rows);
            return results.rows;
        } catch (err) {
            console.error(err.message);
        }

    }

    async atualizar(data, id_usuario){
        let queryString = `UPDATE venda SET data = $2, id_usuario = $3 WHERE id = $1 RETURNING *`;
        let values = [data, id_usuario];
        let results;

        try {
            const res = await db.query(queryString, values);
            //console.log("Dados atualizados");
            return res
        } catch (err) {
            console.error(err.message);
        }
    }

}

//vdao = new VendaDAO();

//vdao.inserir("2022 - 10 - 17T3:41:30.20", 1);
//vdao.inserir(new Date(2022, 10, 17, 3, 49, 20, 20), 1);
//vdao.obter(1);
