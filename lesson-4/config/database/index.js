const mongoose = require("mongoose");
const { MONGO_URI } = process.env

const connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connect successfully!!!"))
    .catch((error) => {
      console.log("Connect failed");
      console.error(error);
    });
};

module.exports = { connect };
