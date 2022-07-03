const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connect db success");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectdb;
