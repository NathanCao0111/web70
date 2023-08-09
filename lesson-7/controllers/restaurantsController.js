const resClientData = require("../utils");

const RestaurantsController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      resClientData(res, 200, data, "them thong tin thanh cong");
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
  },
};

module.exports = RestaurantsController;
