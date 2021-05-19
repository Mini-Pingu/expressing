const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  password: String,
  belong: Array,
});

module.exports = mongoose.model("User", schema);
