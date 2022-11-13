const pool = require('../dbConfig')

module.exports = async (req, res, next) => {
    try {
        const user = await pool.query('SELECT user_admin FROM users WHERE user_id = $1', [req.user.id])

        if (user.rowCount > 0 && 
            user.rows[0].user_admin){
            next()
        }else{
            res.json(false)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
}