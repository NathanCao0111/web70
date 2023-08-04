const { users } = require("../data");
const crypto = require("crypto");

const validateRegister = (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;
    if (!(username && password && fullname)) {
      throw new Error("tất cả đầu vào là bắt buộc");
    }
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      throw new Error("user đã tồn tại");
    }
    const newUser = {
      ...req.body,
      id: crypto.randomUUID(),
    };
    users.push(newUser);
    req.user = newUser;
    return next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = validateRegister;
