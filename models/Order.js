const mongoose = require("mongoose");

const schema = mongoose.Schema({
  orderId: String,
  orderDateTime: String,
  item: Array,
});

module.exports = mongoose.model("Order", schema);
