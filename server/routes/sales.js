const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')
const cDAO = require('../modelo/usuarioDAO')
const pDAO = require('../modelo/produtoDAO')
const vDAO = require('../modelo/vendaDAO')
const vpDAO = require('../modelo/venda_produtoDAO')

router.get('/get-sales', authorization, priviledge, async (req, res) => {

    queryString = `SELECT v.id, v.id_user, u.user_name, pr.descricao, pr.preco ,vp.quantidade, v.data ` +
        `FROM venda AS v, venda_produto AS vp, users AS u, produto AS pr ` +
        `WHERE v.id = vp.id_venda AND vp.id_produto = pr.id AND v.id_user = u.user_id`

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

router.get('/get-specific-sales', authorization, async (req, res) => {

    queryString = `SELECT v.id, v.id_user, u.user_name, pr.descricao, pr.preco ,vp.quantidade, v.data ` +
        `FROM venda AS v, venda_produto AS vp, users AS u, produto AS pr ` +
        `WHERE v.id = vp.id_venda AND vp.id_produto = pr.id AND v.id_user = u.user_id AND u.user_id = $1`
    try {

        const id = req.user.id;
        console.log("user id:");
        console.log(id);
        const sales = await pool.query(queryString, [id])

        res.json(sales.rows);
        console.log("Vendas query: ");
        console.log(sales.rows);

    } catch (err) {
        console.error(err.message);
    }

});

router.get('/get-allUser-sales', authorization, priviledge, async (req, res) => {
    
    try {
        result = await cDAO.obterComprasPerUser()
        res.json(result)
    } catch (err) {
        console.error(err.message);
    }

});



module.exports = router