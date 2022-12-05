const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors");

// middleware
app.use(express.json()) // req.body
app.use(cors())

// Authorization Route
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard Route
app.use('/dashboard', require('./routes/dashboard'))


// Product Route
app.use('/product', require('./routes/products'))
// Category Route
app.use('/category', require('./routes/category'))

// Sales Route
app.use('/sales', require('./routes/sales'))

// Dashboard Route
app.use('/home', require('./routes/home'))

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});

const vDAO = require("./modelo/vendaDAO")

/*
test = async () => {
  console.log(await vDAO.filterPricePerDate())
}
test()
*/

// test = new usuario.Usuario()
// test.vendas = 1
// test.vendas = 2
// console.log(test)



