class SiteController {
  index(req, res) {
    res.status(200).send("Bài tập Lesson 4");
  }
}

module.exports = new SiteController();
