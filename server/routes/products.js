const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')

router.post('/add-product', authorization, priviledge, async (req, res) => {
    try {
        const { descricao, preco, quantidade } = req.body

        /**
         * @TODO Change this to a user DAO
         */
        const newProduct = await pool.query('INSERT INTO public.produto(descricao, preco, quantidade)VALUES ($1, $2, $3) RETURNING *', [
            descricao,
            preco,
            quantidade
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

        const { id } = req.params.id_prod

        /**
         * @TODO Change this to a user DAO
         */
        const newProduct = await pool.query('INSERT INTO public.produto(descricao, preco, quantidade)VALUES ($1, $2, $3) RETURNING *', [
            descricao,
            preco,
            quantidade
        ])

        res.json(newProduct.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})


module.exports = router