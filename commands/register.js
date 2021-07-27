const cfg = require("../config.json")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const RegisterData = require("../models/Register.js")

module.exports.execute = async (client, message, args, embed) => {
 let isim = args[0]
 let yaş = args[1]
  if(!isim) return message.channel.send(embed.setDescription("Bu kullanıcıyı bu şekilde kaydedemem. \n**İsim girmelisin.**")).then(x => x.delete({timeout: 9000}))
  if(!yaş) return message.channel.send(embed.setDescription("Bu kullanıcıyı bu şekilde kaydedemem. \n**Yaş girmelisin.**")).then(x => x.delete({timeout: 9000}))
  const astsex = new RegisterData({
    guildID: message.guild.id,
    userID: message.author.id,
    name: isim,
    age: yaş
  })
  astsex.save().catch(e => console.error(e))
  message.channel.send(embed.setDescription(`Başarılı şekilde izdivaç için kayıt oldun. artık komutları kullanabilirsin`)).then(x => x.delete({timeout: 9000}))
  message.react(cfg.ok)
};
module.exports.configuration = {
  name: "register",
  aliases: ["register"],
};