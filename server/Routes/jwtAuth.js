const router = require('express').Router()
const pool = require('../dbConfig')

//registering
router.post('/register', async (req, res) => {
    try {
        /**
         * 1. Destrucute the req.body (name, email, passwd)
         * 2. Check if the user exists (if the user exists then throw error)
         * 3. Bcrypt the user password
         * 4. Enter new user into the database
         * 5. Generating jwt token
         */

        //1.
        const { name, email, password } = req.body

        //2
        /**
         * @TODO Change this to a client DAO
         */
        //const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [//
        //    email
        //])

        res.json(user.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error")
    }
})

module.exports = router