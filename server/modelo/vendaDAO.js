
const db = require("./dbConfig");
const { log } = require("console");

class VendaDAO{
    async inserir(data_hora, id_usuario) {
        //let u = new usuario.Usuario();
        let queryString = `INSERT INTO venda(data_hora, id_usuario) VALUES ($1, $2)`;
        let values = [data_hora, id_usuario];

        
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

        let queryString = `DELETE FROM venda WHERE id = $1`;
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
        let queryString = `SELECT * FROM venda`;
        
        await db.connect();
        let results = await db.query(queryString);
        await db.end();
        
        console.log("Dados obtidos:", results.rows);
        return results.rows;
    }

    async obter(id){
        let queryString = `SELECT * FROM venda WHERE id = $1`;
        let results;
                
        await db.connect();
        results = await db.query(queryString, [id]);
        await db.end();

        console.log("Dados obtidos: ", results.rows);
        return results.rows;
        
    }

    async atualizar(data_hora, id_usuario){
        let queryString = `UPDATE venda SET data_hora = $2, id_usuario = $3 WHERE id = $1`;
        let values = [data_hora, id_usuario];
        let results;

        await db.connect();
        await db.query(queryString, values);
        await db.end();
        console.log("Dados atualizados");
    }

}

//vdao = new VendaDAO();

//vdao.inserir("2022 - 10 - 17T3:41:30.20", 1);
//vdao.inserir(new Date(2022, 10, 17, 3, 49, 20, 20), 1);
//vdao.obter(1);
