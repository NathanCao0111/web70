const checkUser = (req, res, next) => {
  const { userId } = req.query;
  if (userId) {
    next();
  } else {
    res.status(400).send("Ng dung khong hop le");
  }
};

module.exports = checkUser;
