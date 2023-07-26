const logMdw = (options) => {
  return (req, res, next) => {
    let message = "New req at: " + new Date();
    if (options.withApiKeyInfo) {
      if (req.query.apiKey) {
        message += " - API key attached: " + req.query.apiKey;
      } else {
        message += " - No API key attached";
      }
    }
    console.log(message);
    next();
  };
};

module.exports = logMdw;
