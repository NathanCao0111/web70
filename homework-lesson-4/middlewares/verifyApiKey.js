const { users, posts } = require("../data");

const verifyApiKey = (req, res, next) => {
  try {
    const apiKey = req.query.apiKey;
    const postId = req.params.id;
    const findPost = posts.find((post) => post.id === postId);
    if (findPost) {
      if (apiKey) {
        const validateApiKey = users.find((user) => {
          return apiKey.includes(user.username);
        });
        if (!validateApiKey) {
          throw new Error("Không được phép");
        }
        req.userId = validateApiKey.id;
      } else {
        throw new Error("Không được phép");
      }
    } else {
      throw new Error("post không hợp lệ");
    }
    req.postId = postId;
    return next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = verifyApiKey;
