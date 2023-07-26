const sessionCount = (req, res, next) => {
  console.log(req.session)
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  next();
};

module.exports = sessionCount
