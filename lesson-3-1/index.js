const express = require("express");
const app = express();
const port = 8000;
const route = require('./routes')

// use route
route(app)

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
