const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const generateToken = (data) => {
  const token = jwt.sign(data, TOKEN_KEY, {
    expiresIn: "120s",
  });
  return token;
};

module.exports = generateToken;
