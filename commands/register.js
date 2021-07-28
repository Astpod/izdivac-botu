const cfg = require("../config.json")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const RegisterData = require("../models/Register.js")

module.exports.execute = async (client, message, args, embed) => {
    let isim = args[0]
    let yaş = args[1]
    let insta = args[2]
    let games = args[3]
    let burçs = args[4]
    let hakkında = args[5]
     if(!isim) return message.channel.send("Bu kullanıcıyı bu şekilde kaydedemem. \n**İsim girmelisin.**")
     if(!yaş) return message.channel.send("Bu kullanıcıyı bu şekilde kaydedemem. \n**Yaş girmelisin.**")
     if(!insta) return message.channel.send("Bu kullanıcıyı bu şekilde kaydedemem. \n**Instagram ismini girmelisin.**")
     if(!games) return message.channel.send("Bu kullanıcıyı bu şekilde kaydedemem. \n**Oynadığın oyunun ismini girmelisin.**")
     if(!burçs) return message.channel.send("Bu kullanıcıyı bu şekilde kaydedemem. \n**Burcunu girmelisin.**")
     if(!hakkında) return message.channel.send("Bu kullanıcıyı bu şekilde kaydedemem. \n**Hakkında kısmını girmelisin.**")
     message.channel.send(`${cfg.ok} ${message.author} başarılı şekilde kayıt oldun. \n eğer profilini düzenlemek istersen **${cfg.prefix}idüzenle bilgi** yaparak düzenleyebilirsin.`)
     const astsex = new RegisterData({
       guildID: message.guild.id,
       userID: message.author.id,
       name: isim,
       age: yaş,
       about: hakkında,
       game: games,
       burç: burçs,
       instagram: insta,
     })
     astsex.save().catch(e => console.error(e))
};
module.exports.configuration = {
  name: "register",
  aliases: ["register"],
};