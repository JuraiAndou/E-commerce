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
        //console.log(sales.rows);

        res.json(sales.rows);

    } catch (err) {
        //console.log(queryString);
        console.error(err.message);
        res.status(500).json('Server Error')
    }
});

router.get('/get-specific-sales', authorization, async (req, res) => {

    queryString = `SELECT v.id, v.id_user, u.user_name, pr.descricao, pr.preco ,vp.quantidade, v.data ` +
        `FROM venda AS v, venda_produto AS vp, users AS u, produto AS pr ` +
        `WHERE v.id = vp.id_venda AND vp.id_produto = pr.id AND v.id_user = u.user_id AND u.user_id = $1`
    try {

        const id = req.user.id;
        //console.log("user id:");
        //console.log(id);
        const sales = await pool.query(queryString, [id])

        res.json(sales.rows);
        //console.log("Vendas query: ");
        //console.log(sales.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }

});

router.post('/post-sale', authorization, async(req, res) => {
    let queryString = ``
    let result
    try {
        const products = req.body;

        /**
         * Reduzir do estoque
         * 
         */

        let precoTotal = 0;

        let invalid = false

        for (let j = 0; j < products.length; j++) {
            const pID = products[j].id;
            let prod = await pDAO.obter(pID)
            if (prod.quantidade <= 0){
                invalid = true
            }
        }

        if (!invalid) {
            for(let i=0; i<products.length; i++){
                pDAO.atualizarQuantidade(products[i].id, products[i].quantidade);
                precoTotal += products[i].quantidade * products[i].preco
            }
            //let result = await pDAO.obterTodos();
            
            /**
             * Criar nova venda
             */
            const resVendas = await vDAO.inserir(new Date(Date.now()), req.user.id, precoTotal)
            const parseVendas = resVendas.rows[0]
    
            /**
             * Conectar as tabelas
             */
            
            for(let i=0; i<products.length; i++){
                vpDAO.inserir(parseVendas.id, products[i].id , products[i].quantidade);
            }
            //*/
    
    
            res.json(parseVendas); 
        } else {
            res.json('')
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})


router.get('/get-allUser-sales', authorization, priviledge, async (req, res) => {
    
    try {
        const initialDate = (req.query.date_int != '') ? new Date(req.query.date_int) : new Date(0)
        const final_date = (req.query.date_fnl != '') ? new Date(req.query.date_fnl) : new Date(Date.now())
        result = await cDAO.obterComprasPerUser(initialDate, final_date)
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
        res.status(500).json('Server Error')
    }

});

router.post('/remove-venda-client', authorization, async (req, res) => {
    const { prod } = req.query
    try {
        const remove_venda = await pool.query('DELETE FROM public.venda WHERE id = $1; ', [
            prod
        ])
        const remove_vendaProduto = await pool.query('DELETE FROM venda_produto WHERE id_venda = $1; ', [
            prod
        ])
        res.json(remove_vendaProduto.rowCount)
       
        
    } catch (err) {
        console.error(err.message);
    }

});

router.get('/get-vendas-per-day', authorization, priviledge, async (req, res) => {
    try {
        const initialDate = (req.query.date_int != '') ? new Date(req.query.date_int) : new Date(0)
        const final_date = (req.query.date_fnl != '') ? new Date(req.query.date_fnl) : new Date(Date.now())
        result = await vDAO.filterPricePerDate(initialDate, final_date)

        res.json(result)
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error')
    }
})


module.exports = router