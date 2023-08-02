require("./config/db").connect();

const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Lesson 5 - MongoDB");
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
