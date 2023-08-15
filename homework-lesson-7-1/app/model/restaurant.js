const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Restaurant = new Schema({
  address: { type: Object },
  borough: { type: String },
  cuisine: { type: String },
  grades: { type: Array },
  name: { type: String },
  restaurant_id: { type: String },
});

module.exports = mongoose.model("Restaurant", Restaurant);
