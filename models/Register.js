const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  name: String,
  age: String,
  about: String,
  game: String,
  burç: String,
  instagram: String,
});

module.exports = model("Register", schema);