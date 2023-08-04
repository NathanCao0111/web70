class ApiController {
  // [POST] /api/auth/register
  register(req, res) {
    res.status(200).send({
      data: req.user,
      message: "Success",
      success: true,
    });
  }

  // [POST] /api/auth/login
  login(req, res) {
    res.status(200).send({
      data: req.headers["x-access-token"],
      message: "Success",
      success: true,
    });
  }

  // [POST] /api/posts/reaction/:id
  postReaction(req, res) {
    res.status(200).send({
      data: req.reactPost,
      message: "Success",
      success: true,
    });
  }

  // [PUT] /api/posts/:id
  update(req, res) {
    res.status(200).send({
      data: req.userUpdate,
      message: "Success",
      success: true,
    });
  }
}

module.exports = new ApiController();
