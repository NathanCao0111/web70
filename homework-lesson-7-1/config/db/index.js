// const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const mongoose = require('mongoose')

// connection url
// const client = new MongoClient(MONGO_URI);

// const db = {};

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failed");
    console.error(error);
  }

  // try {
  //   await client.connect();
  //   console.log("Connect successfully");
  //   const database = client.db("restaurant_test");
  //   db.restaurants = database.collection("restaurants");
  //   console.log(db);
  // } catch (error) {
  //   console.log("Connect failed");
  //   console.error(error);
  // }

  // client
  //   .connect()
  //   .then(() => {
  //     console.log("Connect successfully");
  //     const database = client.db("restaurant_test")
  // 		 db.restaurants = database.collection("restaurants")
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     console.log("Connect failed");
  //   });
}

module.exports = { connect };
