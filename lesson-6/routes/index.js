const restaurantRouter = require("./restaurant");

function route(app) {
  app.use("/restaurants", restaurantRouter);
}

module.exports = route;
