const { posts } = require("../data");

const validateUser = (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const verifyUser = posts.find(
      (post) => post.userId === req.userId && post.id === id
    );
    if (!verifyUser) {
      throw new Error("Không có quyền chỉnh sửa");
    }
    for (const key in body) {
      if (verifyUser[key] && key !== "id" && key !== "userId") {
        verifyUser[key] = body[key];
      }
    }
    req.userUpdate = verifyUser;
    return next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = validateUser;
