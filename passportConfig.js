const LocalStrategy = require("passport-local").Strategy
const { pool } = require('./dbConfig')
const bcrypt = require("bcrypt")

function initialize (passport){
    const authenticateUser = (login, password, done) => {
        console.log(login)
        pool.query(
            `SELECT * FROM usuario WHERE login = $1`, [login], (err, results) => {
                if(err){
                    console.log(err)
                }

                console.log(results.rows);

                if(results.rows.length > 0){
                    const user = results.rows[0]
                    bcrypt.compare(password, user.senha, (err, isMatch) => {
                        if(err){
                            console.log(err)
                        }

                        if(isMatch){
                            return done(null, user)
                        } else{
                            return done(null, false, {message: "Incorrect password"})
                        }
                    })
                }else{
                    return done(null, false, {message: "Login not registered"})
                }
            }
        )
    }

    passport.use(
        new LocalStrategy(
            { usernameField: "login", passwordField: "password" },
            authenticateUser
        )
    )

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser((id, done) => {
        pool.query(
            `SELECT * FROM usuario WHERE id = $1`, [id], (err, results) => {
                if (err){
                    console.log(err)
                }
                return done(null,results.rows[0])
            }
        )
    })
}

module.exports = initialize