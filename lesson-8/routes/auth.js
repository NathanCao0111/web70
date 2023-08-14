const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!(email && password)) {
      throw new Error("All input is required");
    }

    // 2. Check existing user & password
    const existingUser = await User.findOne({ email });
    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingUser || !isMatchPassword) {
      throw new Error("Invalid email or password");
    }
    
    // 3. Create a signed jwt token
    const jwtPayload = {
      fullname: existingUser.fullname,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    };
    const token = jwt.sign(jwtPayload, SECRET_KEY, {
      expiresIn: "5m",
    });

    // 4. Save user token
    existingUser.token = token;

    res.status(200).send({
      data: existingUser,
      token: token,
      message: "Success",
      success: "true",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1. Validation
    if (!(fullname && email && password)) {
      throw new Error("All input is required");
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User has already existed");
    }

    // 3. Password hashing
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const user = await User.create({
      fullname,
      email,
      password: encryptedPassword,
    });

    res.status(200).send({
      data: user,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/me", (req, res) => {});

module.exports = router;
