const cfg = require("../config.json")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const RegisterData = require("../models/Register.js")
const LikeData = require("../models/Like.js")
const ProfileData = require("../models/Profil.js")

module.exports.execute = async (client, message, args, embed) => {
  RegisterData.findOne({guildID: message.guild.id, userID: message.author.id}, async (err, res) => {
    if(!res) {
      message.channel.send(embed.setDescription(`İlk öncelik kayıt olmalısın kayıt olmak için \`!register\` komutunu kullanmalısın`))
    } else {
    if(args[0] === "instagram") {
     let insta = args.slice(1).join(" ")
     if(!insta) return message.channel.send(embed.setDescription("**Instagram ismini girmelisin.**")).then(x => x.delete({timeout: 9000}))
     const astpod = new ProfileData({
        guildID: message.guild.id,
        userID: message.author.id,
        instagram: insta
    })
    astpod.save().catch(e => console.error(e))
    message.channel.send(embed.setDescription(`Başarılı şekilde ayalardım.`)).then(x => x.delete({timeout: 9000}))
    message.react(cfg.ok)
    } if(args[0] === "oyun") {
        let oyun = args.slice(1).join(" ")
        if(!oyun) return message.channel.send(embed.setDescription("**Oyunadığın oyunun girmelisin.**")).then(x => x.delete({timeout: 9000}))
        const astpod = new ProfileData({
           guildID: message.guild.id,
           userID: message.author.id,
           game: oyun
       })
       astpod.save().catch(e => console.error(e))
       message.channel.send(embed.setDescription(`Başarılı şekilde ayalardım.`)).then(x => x.delete({timeout: 9000}))
       message.react(cfg.ok)
       } if(args[0] === "burç") {
        let burçs = args.slice(1).join(" ")
        if(!burçs) return message.channel.send(embed.setDescription("**Bir burç girmelisin.**")).then(x => x.delete({timeout: 9000}))
        const astpod = new ProfileData({
           guildID: message.guild.id,
           userID: message.author.id,
           burç: burçs
       })
       astpod.save().catch(e => console.error(e))
       message.channel.send(embed.setDescription(`Başarılı şekilde ayalardım.`)).then(x => x.delete({timeout: 9000}))
       message.react(cfg.ok)
       } if(args[0] === "hakkında") {
        let hakkında = args.slice(1).join(" ")
        if(!hakkında) return message.channel.send(embed.setDescription("**Hakkında kısmını girmelisin.**")).then(x => x.delete({timeout: 9000}))
        const astpod = new ProfileData({
           guildID: message.guild.id,
           userID: message.author.id,
           about: hakkında
       })
       astpod.save().catch(e => console.error(e))
       message.channel.send(embed.setDescription(`Başarılı şekilde ayalardım.`)).then(x => x.delete({timeout: 9000}))
       message.react(cfg.ok)
       } if(args[0] === "bilgi") {
       message.channel.send(embed.setDescription(`Profil düzenleme bilgisi.
${cfg.prefix}profil-düzenle instagram => instagram ismini ayarlar.
${cfg.prefix}profil-düzenle oyun => Onyadığın oyunu ayarlar.
${cfg.prefix}profil-düzenle burç => Burcunu ayarlar.
${cfg.prefix}profil-düzenle hakkında => hakkında kısmını ayarlar.
`))
       }
    } 
  })
};
module.exports.configuration = {
  name: "profil-düzenle",
  aliases: ["iprofil-düzenle", "profildüzenle", "profile-düzenle"],
};