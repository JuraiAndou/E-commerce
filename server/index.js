const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

//middleware
app.use(express.json) //req.body
app.use(cors())

//ROUTES
//register and login routes
app.use('/auth', require('./Routes/jwtAuth'))

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
})