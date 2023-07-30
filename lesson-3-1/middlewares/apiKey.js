const apiKey = (req, res, next) => {
  if (!req.query.api_key) {
    res.send("API key is missing");
    return;
  }
  next();
};

module.exports = apiKey;
