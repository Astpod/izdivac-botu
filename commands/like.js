const cfg = require("../config.json")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const RegisterData = require("../models/Register.js")
const LikeData = require("../models/Like.js")

module.exports.execute = async (client, message, args, embed) => {
  RegisterData.findOne({guildID: message.guild.id, userID: message.author.id}, async (err, res) => {
    if(!res) {
      message.channel.send(embed.setDescription(`İlk öncelik kayıt olmalısın kayıt olmak için \`!register\` komutunu kullanmalısın`))
    } else {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı etiketlemelisin.`))
      await LikeData.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { like: 1 } }, { upsert: true });
      message.channel.send(embed.setDescription(`${message.author}, tarafından ${member} adlı kişiye like atıldı. \n kişinin toplam like sayısı için **${cfg.prefix}like-bilgi** yazarak bakabilirsiniz.`)).then(x => x.delete({timeout: 9000}))
      message.react(cfg.ok)
    }
  })
};
module.exports.configuration = {
  name: "like",
  aliases: ["beğen"],
};
