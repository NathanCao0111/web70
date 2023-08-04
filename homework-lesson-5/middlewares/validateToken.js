const verifyToken = require("../utils/verifyToken");

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Cần có mã để truy cập");
    }
    try {
      const decoded = verifyToken(token);
      req.userId = decoded.userId;
      return next();
    } catch (error) {
      res.status(401).send("Yêu cầu không hợp lệ");
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = validateToken;
