const { users } = require("../data");
const generateToken = require("../utils/generateToken");

const validateLogin = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      throw new Error("tất cả đầu vào là bắt buộc");
    }
    const existingUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!existingUser) {
      throw new Error("user không tồn tại");
    }
    const token = generateToken({ userId: existingUser.id });
    req.headers['x-access-token'] = token;
    return next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = validateLogin;
