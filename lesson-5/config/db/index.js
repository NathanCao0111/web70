const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://127.0.0.1/user_test")
    .then(() => console.log("Connect successfully"))
    .catch((err) => {
      console.log("Connect failed");
      console.error(err);
    });
}

module.exports = { connect };
