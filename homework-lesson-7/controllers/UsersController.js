const resClientData = require("../utils/resClientData");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

class UsersController {
  // [POST] /users/auth/register
  async register(req, res) {
    try {
      const { fullname, email, password } = req.body;

      if (!(fullname && email && password)) {
        throw new Error("All input is required");
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User has already existed");
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        fullname,
        email,
        password: encryptedPassword,
      });

      resClientData(res, 200, `User ${user.email} created successfully`);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [POST] /users/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        throw new Error("All input is required");
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new Error("User is not existed");
      }

      const isMatchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isMatchPassword) {
        throw new Error("Invalid credentials");
      }

      const jwtPayload = {
        id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
      };

      const token = jwt.sign(jwtPayload, SECRET_KEY, {
        expiresIn: "1h",
      });

      resClientData(res, 200, token);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }
}

module.exports = new UsersController();
