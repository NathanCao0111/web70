const { users } = require('../data')

const requireApiKey = (req, res, next) => {
  const apiKeyArray = users.map((element) => element.apiKey);
  if (!apiKeyArray.includes(req.query.apiKey)) {
    res.send("API Key is missing or incorrect");
    return;
  }
  next();
};

module.exports = requireApiKey;
