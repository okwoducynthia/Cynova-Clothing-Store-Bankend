const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("../src/Config/db");
const productRoutes = require("./Routes/ProductRoutes")
const userRoutes = require("./Routes/UserRoutes")
const app = express();
connectDB();


app.use(bodyParser.json())
const port = process.env.PORT || 8000;

app.use(cors())

app.use("/api/products", productRoutes)
app.use("/api/user", userRoutes)


app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`.yellow)
);