require("dotenv").config();
require("./configs/db").connect();

const express = require("express");
const app = express();
const { PORT } = process.env;
const route = require("./routes");

app.use(express.json());

route(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
