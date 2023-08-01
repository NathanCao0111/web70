require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const { API_PORT, TOKEN_KEY } = process.env;
const port = process.env.PORT || API_PORT;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./model/user");
const auth = require("./middleware/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    // step 1: get user input
    const { first_name, last_name, email, password } = req.body;

    // step 2: validate empty user input
    if (!(first_name && last_name && email && password)) {
      throw new Error("All input is required");
    }

    // step 3: validate existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already existed. Please login!");
    }

    // step 4: encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // step 5: create user in the database
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
    });

    // step 6: create a signed JWT Token
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // step 7: save user token
    user.token = token;

    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    // step 1: get user input
    const { email, password } = req.body;

    // step 2: validate empty user input
    if (!(email && password)) {
      throw new Error("All input is required");
    }

    // step 3: validate existing user
    const user = await User.findOne({ email });

    // step 4: verify email & password input against password in DB
    if (user && (await bcrypt.compare(password, user.password))) {
      // step 5: create a signed JWT Token
      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // step 6: save user token
      user.token = token;

      res.status(200).json(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/welcome", auth, (req, res) => {
  console.log(req.user.email)
  res.status(200).send("Welcome");
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
