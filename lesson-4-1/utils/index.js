const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const generateToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY, {
    expiresIn: "180s",
  });
  return token;
};

const verifyToken = (token) => {
  const decode = jwt.verify(token, SECRET_KEY);
  return decode;
};

module.exports = { generateToken, verifyToken };
