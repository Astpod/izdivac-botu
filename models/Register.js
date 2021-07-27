const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  name: String,
  age: String
});

module.exports = model("Register", schema);