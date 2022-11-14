const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')

router.post('/add-category', authorization, priviledge, async (req, res) => {
    try {
        const { descricao } = req.body

        /**
         * @TODO Change this to a user DAO
         */
        const newCategory = await pool.query('INSERT INTO public.categoria(descricao)VALUES ($1) RETURNING *', [
            descricao,
        ])

        res.json(newCategory.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/get-categories', authorization, priviledge, async (req, res) => {
    try {
        /**
         * @TODO Change this to a user DAO
         */
        const categoy = await pool.query('SELECT * FROM categoria')

        res.json(categoy.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})


module.exports = router