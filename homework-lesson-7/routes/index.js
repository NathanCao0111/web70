const usersRouter = require("./user");
const postsRouter = require("./post");

function route(app) {
  app.use("/users", usersRouter);
  app.use("/posts", postsRouter);
}

module.exports = route;
