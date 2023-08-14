const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw new Error("A token is needed for authorization");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).send(error.message);
    }
    return res.status(401).send(error.message);
  }
};

module.exports = auth;
