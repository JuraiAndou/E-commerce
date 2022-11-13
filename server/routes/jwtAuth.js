const express = require('express')
const router = require('express').Router()
const pool = require('../dbConfig')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

//registering
router.post('/register', validInfo, async (req, res) => {
    try {
        /**
         * 1. Destrucute the req.body (name, email, passwd)
         * 2. Check if the user exists (if the user exists then throw error)
         * 3. Bcrypt the user password
         * 4. Enter new user into the database
         * 5. Generating jwt token
         */

        //  1.
        const { name, email, password } = req.body

        //  2.
        /**
         * @TODO Change this to a user DAO
         */
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email
        ])

        if (user.rows.length !== 0) {
            return res.status(401).send('email alredy registered')
        }

        //  3.
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password, salt)

        //  4.
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [
            name, email, bcryptPassword
        ])
        //res.json(newUser.rows[0])

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({ token })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error")
    }
})

router.post('/login', validInfo, async (req, res) => {
    try {
        /**
         * 1. Destrucute the req.body (email, pswd)
         * 2. Check if the user doesn't exists (if the user doesn't exists then throw error)
         * 3. Check if incomming pswd is the same as the database pswd
         * 4. give them the jwt token
         */

        // 1.
        const { email, password } = req.body

        // 2.
        /**
         * @TODO Change this to a user DAO
         */
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect")
        }

        // 3.
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        )

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }

        // 4.
        const token = jwtGenerator(user.rows[0].user_id)

        res.json({ token })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router