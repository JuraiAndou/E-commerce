
const db = require("../dbConfig");
const { log } = require("console");

class VendaDAO{
    async inserir(data, id_usuario) {
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
        let queryString = `Select venda.id, users.user_name ,venda.data,venda.preco_final from users inner join venda on venda.id_user = users.user_id where users.user_id = $1;`
        let values = [id_user]
        let results

        try {
            results = await db.query(queryString, values);
            return results.rows;
            

        } catch (err) {
            console.error(err.stack)
        }
    }

    //------------------Funções para captação de compras por data 
    async getPriceSales(){
        let queryString = `SELECT data, venda.preco_final FROM venda`
        let results

        try {
            results = await db.query(queryString);
            return results.rows;
            
        } catch (err) {
            console.error(err.stack)
        }

    }

    async getDateSales(){
        let queryString = `select DISTINCT venda.data FROM venda`
        let results

        try {
            results = await db.query(queryString);
            return results.rows;
            
        } catch (err) {
            console.error(err.stack)
        }

    }

    async getFullPricePerDate(){
        let diasDeVenda = await this.getDateSales()
        let pricesSales = await this.getPriceSales()
        let vendasPerDay = []
        let precoTotal = 0

       
        for (let i = 0; i < diasDeVenda.length; i++){
            for (let j = 0; j < pricesSales.length; j++){
                if (JSON.stringify(pricesSales[j].data) == JSON.stringify(diasDeVenda[i].data)){
                    precoTotal += pricesSales[j].preco_final
                }
            }
            vendasPerDay.push([diasDeVenda[i].data, precoTotal])
            precoTotal = 0
        } 
        return vendasPerDay  
    }

    //estabelece um periodo da mostragem de ganho totais por dia
    async filterPricePerDate(date){
        let vendasPerDay = await this.getFullPricePerDate()

        for (let i = 0; i < vendasPerDay.length; i++){
            if (vendasPerDay[i][0] < new Date('2022-09-11T03:00:00.000Z')){
                vendasPerDay.splice(i, 1)
            }

        }
        vendasPerDay.sort((a, b) => a[0] - b[0]);

        return vendasPerDay 
    }
}

module.exports = new VendaDAO;