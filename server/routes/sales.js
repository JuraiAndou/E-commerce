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

router.get('/get-allUser-sales', authorization, async (req, res) => {
    
    try {
        result = await cDAO.obterComprasPerUser()
        res.json(result)
    } catch (err) {
        console.error(err.message);
    }

});

router.post('/post-sale', authorization, async(req, res) => {
    let queryString = ``
    try {
        const products = req.body;

        /**
         * Reduzir do estoque
         * 
         */

        let precoTotal = 0;

        for(let i=0; i<products.length; i++){
            //console.log("AOBA " + i);
            //console.log(products[i].id, products[i].quantidade);
            pDAO.atualizarQuantidade(products[i].id, products[i].quantidade);
            precoTotal += products[i].quantidade * products[i].preco
        }
        //let result = await pDAO.obterTodos();
        
        /**
         * Criar nova venda
         */
        //console.log("Olha a dataaaaaaaaa");
        //console.log(new Date(Date.now()));
        const resVendas = await vDAO.inserir(new Date(Date.now()), req.user.id, precoTotal)
        //console.log("OLHA A VENDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        //console.log(resVendas);

        const parseVendas = resVendas.rows[0]

        //console.log(parseVendas);

        /**
         * Conectar as tabelas
         */
        
        for(let i=0; i<products.length; i++){
            //console.log("AOBA " + i);
            //console.log(products[i].id, products[i].quantidade);
            vpDAO.inserir(parseVendas.id, products[i].id , products[i].quantidade);
        }
        //*/


        res.json(result);

    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router