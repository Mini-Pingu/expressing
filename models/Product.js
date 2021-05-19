const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  code: String,
  price: Number,
});

module.exports = mongoose.model("Product", schema);
