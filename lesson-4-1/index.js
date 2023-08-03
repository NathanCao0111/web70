require('dotenv').config()

const express = require("express");
const app = express();
const port = 8000;
const { generateToken, verifyToken } = require('./utils')
const users = require('./data')
const middlewares = require('./middlewares')

app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  try {
   console.log(req.headers)
    const { email, password } = req.body;
    if (!(email && password)) {
      throw new Error("All input is required");
    }
    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!existingUser) {
      throw new Error("Invalid email or password");
    }
    res.status(200).send({
      data: generateToken({ userId: existingUser.id }),
      message: "Login successfully",
      success: true,
    });
  } catch (error) {
    res.status(403).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.get("/api/user-info/", middlewares.decodeToken, middlewares.validateUser, (req, res) => {
  try {
    res.status(200).send({
      data: req.decode,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.get("/api/user-info/:id", (req, res) => {
  try {
    const id = req.params.id;
    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      throw new Error("Cannot find user");
    }
    res.status(200).send({
      data: findUser,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
