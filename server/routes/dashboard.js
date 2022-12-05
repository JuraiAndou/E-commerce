const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const bcrypt = require('bcrypt')
const cDAO = require ("../modelo/usuarioDAO")


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
        const user = await pool.query('SELECT user_name, user_email, user_adress FROM users WHERE user_id = $1', [req.user.id])
        console.log(user.rows[0]);
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
        
        const {user_name, user_email, user_adress, user_password} = await req.body;
        //console.log(newName);
        // Criptografar a senha
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(user_password, salt)
        console.log(user_name, user_email, user_adress, user_password);
        const user = await pool.query('UPDATE users SET user_name = $1, user_email = $2, user_adress = $3, user_password = $4 WHERE user_id = $5 RETURNING user_name, user_email, user_adress, user_password', 
        [user_name, user_email, user_adress, bcryptPassword, req.user.id])

        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/deleteUser', authorization, async (req, res) => {
    try {
        console.log("bingus");
        /**
         * @TODO Change this to a user DAO
         */
        
        const result = await pool.query('DELETE FROM users WHERE user_id=$1', 
        [req.user.id]);

        res.json("User deleted ", result)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/get-all-users', authorization, async (req, res) => {
    
    try {
        result = await cDAO.obterTodos()
        res.json(result)
    } catch (err) {
        console.error(err.message);
    }

});

module.exports = router