const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  about: String,
  game: String,
  burç: String,
  instagram: String,
  randevu: { type: Number, default: 0 },
  accept: { type: Number, default: 0 },
  deny: { type: Number, default: 0 }
});

module.exports = model("Profile", schema);