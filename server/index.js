const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors");

//middleware
app.use(express.json()) //req.body
app.use(cors())

app.use("/auth", require("./routes/jwtAuth"));

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});