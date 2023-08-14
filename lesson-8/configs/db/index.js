const { MONGO_URI } = process.env;
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failed");
    console.error(error);
  }
}

module.exports = { connect };
