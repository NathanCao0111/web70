const { users, posts } = require("../data");

const reactPost = (req, res, next) => {
  try {
    const { id } = req.params;
    let postToReact = posts.find((post) => post.id === id);
    if (!postToReact) {
      throw new Error("Không tìm thấy bài viết");
    }
    if (!postToReact.liked) {
      postToReact = {
        ...postToReact,
        liked: [req.userId],
      };
    } else {
      if (!postToReact.liked.includes(req.userId)) {
        postToReact = {
          ...postToReact,
          liked: [...postToReact.liked, req.userId],
        };
      } else {
				postToReact = {
          ...postToReact,
          liked: [...postToReact.liked],
        };
        const findLikedElementIndex = postToReact.liked.indexOf(req.userId);
        postToReact.liked.splice(findLikedElementIndex, 1);
      }
    }
    req.reactPost = postToReact;
    return next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = reactPost;
