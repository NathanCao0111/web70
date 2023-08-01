const { posts } = require("../data");

class ApiController {
  login(req, res) {
    res.status(200).send({
      message: "Đăng nhập thành công",
      apiKey: req.apiKey,
    });
  }

  register(req, res) {
    res.status(200).send({
      message: "Đăng kí thành công",
      apiKey: req.apiKey,
    });
  }

  posts(req, res) {
    /**
     * Bài 3 mình đang hiểu là chỉ cần viết phần logic theo đề 
     * bài, chứ bản chất là sau mỗi request thì file JS sẽ không
     * lưu trữ được data ở field viewer, trừ khi dùng database. 
     * Có gì bạn chữa giúp mình bài 3 nha.
     */
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
      res.status(200).json(reqPost);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = new ApiController();
