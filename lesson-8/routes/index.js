const authRouter = require("./auth");
const aggregationRouter = require("./aggregation");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/aggregation", aggregationRouter);
}

module.exports = route;
