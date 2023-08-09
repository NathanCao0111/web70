require("dotenv").config();
require("./config/db").connect();

const express = require("express");
const app = express();
const route = require("./routes");

app.use(express.json());

route(app);

app.listen(8000, () => console.log(`App listening at http://localhost:8000`));
