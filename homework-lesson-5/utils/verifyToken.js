const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const verifyToken = (token) => {
  const decoded = jwt.verify(token, TOKEN_KEY);
  return decoded;
};

module.exports = verifyToken;
