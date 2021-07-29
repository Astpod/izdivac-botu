const cfg = require("../config.json")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const RegisterData = require("../models/Register.js")

module.exports.execute = async (client, message, args, embed) => {
   RegisterData.findOne({guildID: message.guild.id, userID: message.author.id}, async (err, res) => {
    if(!res) {
      message.channel.send(embed.setDescription(`İlk öncelik kayıt olmalısın kayıt olmak için \`!register\` komutunu kullanmalısın`))
    } else {
message.channel.send(embed.setDescription(`Rozet Bilgileri \n

\`•\` 30 kabul edilen randevu rolü: <@&${cfg.rozetrol1}>
\`•\` 40 kabul edilen randevu rolü: <@&${cfg.rozetrol2}>
\`•\` 50 kabul edilen randevu rolü: <@&${cfg.rozetrol3}>
\`•\` 60 kabul edilen randevu rolü: <@&${cfg.rozetrol4}>


\`•\` 30 red edilen randevu rolü: <@&${cfg.redrozetrol1}>
\`•\` 40 red edilen randevu rolü: <@&${cfg.redrozetrol2}>
\`•\` 50 red edilen randevu rolü: <@&${cfg.redrozetrol3}>
\`•\` 60 red edilen randevu rolü: <@&${cfg.redrozetrol4}>

`))
     }
  })
};
module.exports.configuration = {
  name: "bilgi",
  aliases: ["yardım"],
};
