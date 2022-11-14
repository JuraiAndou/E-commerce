const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')

router.post('/add-product', authorization, priviledge, async (req, res) => {
    try {
        const { descricao, preco, quantidade } = req.body
        console.log(req.body);
        /**
         * @TODO Change this to a user DAO
         */
        const newProduct = await pool.query('INSERT INTO public.produto(descricao, preco, quantidade)VALUES ($1, $2, $3) RETURNING *', [
            descricao,
            parseFloat(preco),
            parseInt(quantidade)
        ])

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
        const newProduct = await pool.query('UPDATE produto SET descricao = $1, preco = $2, quantidade = $3 WHERE id = $4 RETURNING *', [
            descricao,
            preco,
            quantidade,
            prod
        ])

        res.json(newProduct.rows[0])
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
        const newProduct = await pool.query('DELETE FROM public.produto WHERE id = $1;', [
            prod
        ])

        res.json(newProduct.rowCount)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})


module.exports = router