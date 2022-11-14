const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req, res) => {
    try {
        //res.json(req.user)

        /**
         * @TODO Change this to a user DAO
         */
        const user = await pool.query('SELECT user_name FROM users WHERE user_id = $1', [req.user.id])

        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/data', authorization, async (req, res) => {
    try {
        //res.json(req.user)

        /**
         * @TODO Change this to a user DAO
         */
        const user = await pool.query('SELECT user_name, user_email FROM users WHERE user_id = $1', [req.user.id])

        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/update', authorization, async (req, res) => {
    try {
        //res.json(req.user)

        /**
         * @TODO Change this to a user DAO
         */
        
        const {user_name, user_email} = await req.body;
        //console.log(newName);
        
        const user = await pool.query('UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING user_name, user_email', 
        [user_name, user_email, req.user.id])

        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

module.exports = router