const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')

router.get('/get-products', async (req, res) => {
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

module.exports = router