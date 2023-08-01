const { users } = require("../data");
const onlyLettersOrNumbers = require("../utils/onlyLettersOrNumbers");

const verifyRegister = (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;
    if (!username) {
      throw new Error("username là bắt buộc");
    }
    const findUser = users.find((element) => element.username === username);
    if (findUser) {
      throw new Error("username đã tồn tại");
    }
    if (!onlyLettersOrNumbers(username)) {
      throw new Error("username sai định dạng");
    }
    if (!password) {
      throw new Error("password là bắt buộc");
    }
    if (!onlyLettersOrNumbers(password) || password.length < 6) {
      throw new Error("password sai định dạng");
    }
    req.apiKey = `${username}.${password}`;
    return next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = verifyRegister;
