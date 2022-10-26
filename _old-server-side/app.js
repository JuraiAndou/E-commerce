const express = require('express')
const app = express()
const { pool } = require('./dbConfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const passport = require("passport")

const UsuarioDAO = require('./user/usuarioDAO')

const userDAO = new UsuarioDAO()

const initializePassport = require("./passportConfig")

initializePassport(passport)

const PORT = process.env.PORT || 3000


//app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.get("/", (req, res) => {
    res.render('index');
})

app.get("/users/register", checkAuteticated, (req, res) => {
    res.render("register")
})

app.get("/users/login", checkAuteticated, (req, res) => {
    res.render("login")
})

app.get("/users/dashboard", checkNotAuteticated, (req, res) => {
    res.render("dashboard", {user: req.user.nome})
})

app.get("/users/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err);}
        req.flash("success_msg", "You have logged out")
        res.redirect("/users/login")
    })
})

app.post('/users/register', async (req, res) => {
    let { name, adress, email, login, password, password2 } = req.body
    console.log({
        name,
        adress,
        email,
        login,
        password,
        password2
    })

    let errors = []

    if (!name || !adress || !email || !login || !password || !password2){
        errors.push({ message: "Please enter all fields" })
    }

    if(password.length < 6){
        errors.push({ message: "Password should be at least 6 characters" })
    }

    if (password != password2){
        errors.push({ message: "Passwords do not match" })
    }

    if(errors.length > 0){
        res.render('register', ({ errors }))
    }else{
        //Passed the form validation

        let hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        pool.query(
            `SELECT * FROM usuario
            WHERE email = $1`,
            [email],
            (err, results) => {
                if(err){
                    console.log(err);
                }
                
                console.log(results.rows)

                if(results.rows.length > 0){
                    errors.push({ message: "Email alredy registered"})
                    res.render('register', { errors })
                }else{
                    userDAO.inserir(name, adress, email, login, hashedPassword, res, req).then(() => {
                        req.flash('success_msg', "You are now registered. Please login")
                        res.redirect("/users/login")
                    })
                    /*pool.query(
                        `INSERT INTO usuario (nome, endereco, email, login, senha, administrador)
                        VALUES ($1, $2, $3, $4, $5, false)
                        RETURNING id, senha`, [name, adress, email, login, hashedPassword], (err, results) => {
                            if (err){
                                console.log(err)
                            }
                            console.log(results.rows)
                            req.flash('success_msg', "You are now registered. Please login")
                            res.redirect("/users/login")
                        }
                    )*/
                }
            }
        )
    }
})

app.post("/users/login", passport.authenticate("local", {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}))

function checkAuteticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect("/users/dashboard")
    }
    next()
}

function checkNotAuteticated(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login')
}

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})
