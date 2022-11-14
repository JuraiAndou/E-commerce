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
        const category = await pool.query('SELECT * FROM categoria')

        res.json(category.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/update-category', authorization, priviledge, async (req, res) => {
    try {
        
        const { descricao } = req.body

        const { cat } = req.query
        /**
         * @TODO Change this to a user DAO
         */
        const newCategory = await pool.query('UPDATE categoria SET descricao = $1 WHERE id = $2 RETURNING *', [
            descricao,
            cat
        ])

        res.json(newCategory.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/remove-category', authorization, priviledge, async (req, res) => {
    try {
        const { cat } = req.query

        /**
         * @TODO Change this to a user DAO
         */
        const oldCategory = await pool.query('DELETE FROM public.categoria WHERE id = $1;', [
            cat
        ])

        res.json(oldCategory.rowCount)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

module.exports = router