const { verifyToken } = require("../utils");
const users = require("../data");

const middlewares = {
  decodeToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = verifyToken(token);
      req.userId = decode.userId;
      req.decode = decode;
      return next();
    } catch (error) {
      res.status(403).send('Invalid token');
    }
  },
  validateUser: (req, res, next) => {
    try {
      // code logic check user exist with userId in req
      const findUser = users.find(user => user.id === req.userId)
      if (!findUser) {
        throw new Error('Cannot find user')
      }
      return next();
    } catch (error) {
      res.status(403).send(error.message)
    }
  },
};

module.exports = middlewares;
