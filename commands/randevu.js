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
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı etiketlemelisin.`))
      const filter = (reaction, user) => {
        return ([cfg.ok, cfg.no].includes(reaction.emoji.id) && user.id === member.id);
    };
    const Prof = await ProfileData.findOne({guildID: message.guild.id, userID: member.user.id})
    let teklif = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`${message.author} size bir randevu teklif ediyor kabul ediyor musun?
\`•\` Randevu teklifini veren kullanıcıyı incelemek için **${cfg.prefix}profil @kullanıcı** komutunu kullanabilirsiniz.`)
    .setColor("RANDOM")
    let mesaj = await message.guild.channels.cache.get(cfg.randevunvarkanalı).send(`${member}`,teklif)
    await mesaj.react(cfg.ok);
    await mesaj.react(cfg.no);
    mesaj.awaitReactions(filter, {
        max: 1,
    }).then(collected => {
     const reaction = collected.first();
     if (reaction.emoji.id === cfg.ok) {
    message.channel.send(`${cfg.ok} ${message.author}, ${member} adlı kullanıcı randevu teklifini kabul etti odaya yönlendirliyor.`)
    if(!message.member.voice.channel) return message.channel.send(embed.setDescription(`Randevu gönderen kişi seste bulunmuyor.`))
    if(!member.voice.channel) return message.channel.send(embed.setDescription(`Randevu alan kişi seste bulunmuyor.`))
    await ProfileData.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { accept: 1 } }, { upsert: true });
    message.member.voice.setChannel(member.voice.channel);
    if(Prof.accept.length > 5) {
    await message.member.roles.add(cfg.rozetrol1)
    } if(Prof.accept.length > 10) {
    await message.member.roles.add(cfg.rozetrol2)
    } if(Prof.accept.length > 15) {
    await message.member.roles.add(cfg.rozetrol3)
    } if(Prof.accept.length > 20) {
    await message.member.roles.add(cfg.rozetrol4)
    }
    } else {
    message.channel.send(`${cfg.no} ${message.author}, ${member} adlı kullanıcı randevu teklifini red etti.`)
    await ProfileData.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { deny: 1 } }, { upsert: true });
     }
    })
    }
  })
};
module.exports.configuration = {
  name: "randevu",
  aliases: ["randevü"],
};
