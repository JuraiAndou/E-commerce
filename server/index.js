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


// Dashboard Route
app.use('/home', require('./routes/home'))

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});