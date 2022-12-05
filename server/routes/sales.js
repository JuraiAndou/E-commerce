const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')
const cDAO = require('../modelo/usuarioDAO')
const vDAO = require('../modelo/vendaDAO')


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
        const sales = await pool.query(queryString, [id])

        res.json(sales.rows);

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

router.get('/get-vendas-user', authorization, priviledge, async (req, res) => {

    try {
        const user  = req.header('user')
        result = await vDAO.getVendasPerUser(user)
        res.json(result)

    } catch (err) {
        console.error(err.message);
    }

});

router.post('/remove-venda-client', authorization, async (req, res) => {
    const { prod } = req.query
    try {
        console.log(prod);
       
        
    } catch (err) {
        console.error(err.message);
    }

});

router.get('/get-vendas-per-day', authorization, priviledge, async (req, res) => {
    try {
        const initialDate = (req.query.date_int != undefined) ? new Date(req.query.date_int) : new Date(0)
        const final_date = (req.query.date_fnl != undefined) ? new Date(req.query.date_fnl) : Date.now()
        result = await vDAO.filterPricePerDate(initialDate, final_date)

        res.json(result)
    } catch (err) {
        console.error(err);
    }
})

module.exports = router