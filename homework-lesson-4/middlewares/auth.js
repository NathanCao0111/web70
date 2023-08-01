const { users } = require("../data");

const findUser = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      throw new Error("vui lòng nhập tất cả các trường đầu vào");
    }
    const user = users.find(
      (element) =>
        element.username === username && element.password === password
    );
    if (user) {
      req.apiKey = user.apiKey
      return next();
    } else {
      throw new Error("username hoặc password không đúng");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = findUser;
