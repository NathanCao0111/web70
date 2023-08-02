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
    res.status(200).json(req.reqPost);
  }
}

module.exports = new ApiController();
