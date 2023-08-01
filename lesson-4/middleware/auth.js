const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      throw new Error("A token is required for authentication");
    }
  
    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      req.user = decoded;
      console.log(req.user);
    } catch (error) {
      throw new Error("Invalid action");
    }
  
    return next();
  } catch (error) {
    res.status(400).send(error.message)
  }
};

module.exports = verifyToken;
