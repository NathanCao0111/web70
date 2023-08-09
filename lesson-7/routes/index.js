const rootRouterV1 = require("./rootRouterV1");

function route(app) {
  app.use("/api/v1", rootRouterV1);
}

module.exports = route;
