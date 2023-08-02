const { posts } = require("../data");

const addViewer = (req, res, next) => {
  try {
    let reqPost = posts.find((post) => post.id === req.postId);
    if (!reqPost.viewer) {
      reqPost = {
        ...reqPost,
        viewer: [req.userId],
      };
    } else {
      if (!reqPost.viewer.includes(req.userId)) {
        reqPost = {
          ...reqPost,
          viewer: [...reqPost.viewer, req.userId],
        };
      } else {
        reqPost = {
          ...reqPost,
          viewer: [...reqPost.viewer],
        };
      }
    }
    req.reqPost = reqPost;
    return next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = addViewer;
