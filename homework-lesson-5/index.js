require("dotenv").config();

const express = require("express");
const app = express();
const port = 8000;
const route = require("./routes");

app.use(express.json());

route(app);

app.get("/", (req, res) => {
  res.status(200).send("Bài tập Lesson 5");
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
