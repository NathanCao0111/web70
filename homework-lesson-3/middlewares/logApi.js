const logApi = (req, res, next) => {
  console.log("New req at: ", new Date().toLocaleString('vi'));
  next();
};

module.exports = logApi;
