require("dotenv").config();
require("./config/db").connect();

const express = require("express");
const app = express();
const route = require("./routes");
const { PORT } = process.env;

app.use(express.json());

route(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
