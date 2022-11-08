const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')

//middleware
app.use(express.json) //req.body
app.use(cors())

//ROUTES

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})