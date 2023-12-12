const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbCollection = process.env.DB_COLLECTION;

  mongoose
    .connect(
      `mongodb+srv://${dbUser}:${dbPassword}@gdocscluster.l5mmayw.mongodb.net/${dbCollection}?retryWrites=true&w=majority`
    )
    .then(() => console.log("CONNECTED TO MONGO DB"))
    .catch((err) => console.log(err));
};

module.exports = connectToDatabase;
