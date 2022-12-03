const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')


router.get('/get-sales', authorization, priviledge, async(req, res) => {
    
    queryString = `SELECT v.id, v.id_usuario, u.user_name, pr.descricao, pr.preco ,vp.quantidade, v.data_hora ` + 
                  `FROM venda AS v, venda_produto AS vp, users AS u, produto AS pr ` +
                  `WHERE v.id = vp.id_venda AND vp.id_produto = pr.id AND v.id_usuario = u.user_id`
    
    try {
        //const{user_id} = req.

        const sales = await pool.query(queryString);
        console.log(sales.rows);

        res.json(sales.rows);

    } catch (err) {
        console.log(queryString);
        console.error(err.message);
    }
});

module.exports = router