const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')
const pcDAO = require('../modelo/produto_categoriaDAO')

router.post('/add-product', authorization, priviledge, async (req, res) => {
    try {
        const { descricao, preco, quantidade, categoria } = req.body
        //console.log("bingus");
        //console.log(req.body);
        /**
         * @TODO Change this to a user DAO
         */
        const newProduct = await pool.query('INSERT INTO public.produto(descricao, preco, quantidade)VALUES ($1, $2, $3) RETURNING *', [
            descricao,
            parseFloat(preco),
            parseInt(quantidade)
        ])

        const newId = await newProduct.rows[0].id;
        //console.log("bingus");
        //console.log(newId);
        //console.log(categoria);
        // Dar uma categoria ao produto
        const newProductCategory = await pcDAO.inserir(newId, categoria)
        //console.log(newProduct.rows);
        res.json(newProduct.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/get-products', authorization, priviledge, async (req, res) => {
    try {
        //res.json(req.user)

        /**
         * @TODO Change this to a user DAO
         */
        const product = await pool.query('SELECT * FROM produto')
        
        res.json(product.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/update-product', authorization, priviledge, async (req, res) => {
    try {
        
        const { descricao, preco, quantidade } = req.body

        const { prod } = req.query

        /**
         * @TODO Change this to a user DAO
         */
        const newProduct = await pool.query('UPDATE produto SET descricao = $1, preco = $2, quantidade = $3 WHERE id = $4', [
            descricao,
            preco,
            quantidade,
            prod
        ])

        res.json(newProduct.rowCount)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/remove-product', authorization, priviledge, async (req, res) => {
    try {
        const { prod } = req.query

        /**
         * @TODO Change this to a user DAO
         */
        const remove_child = await pool.query('DELETE FROM public.venda_produto WHERE id_produto = $1; ', [
            prod
        ])
        const remove_parent = await pool.query('DELETE FROM public.produto WHERE id = $1; ', [
            prod
        ])
        res.json(remove_parent.rowCount)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})


module.exports = router