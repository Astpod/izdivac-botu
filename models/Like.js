const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  like: { type: Number, default: 0 }
});

module.exports = model("Like", schema);