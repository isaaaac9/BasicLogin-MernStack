const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const { readdirSync } = require("fs");
const connectdb = require("./config/db");

const app = express();

//Connectdb
connectdb();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());

//Route
//localhost:3000/api/
app.use("/api", require("./Routes/auth"));

readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server running on " + port);
});
