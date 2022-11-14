const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')

router.get('/add-product', authorization, priviledge, async (req, res) => {
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

router.get('/add-product', authorization, priviledge, async (req, res) => {
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

module.exports = router