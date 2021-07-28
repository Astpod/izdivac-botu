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
      const Regs = await RegisterData.findOne({guildID: message.guild.id, userID: member.user.id})
      const Prof = await ProfileData.findOne({guildID: message.guild.id, userID: member.user.id})
      const likeTop = await LikeData.findOne({guildID: message.guild.id, userID: member.user.id})
      const embeds = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL({dynamic: true}))
      .setDescription(`
**❯ Kullanıcı Bilgisi**
\`•\` Hesap: ${member}
\`•\` Kullanıcı ID: ${member.id}

**❯ Kullanıcı Profili**
\`•\` İsim: **${Regs ? Regs.name : "Kullanıcının ismi bulunmuyor."}**
\`•\` Yaş: **${Regs ? Regs.age : "Kullanıcının yaşı bulunmuyor."}**
\`•\` Instagram: **${Regs ? Regs.instagram : "Kullanıcının instagram hesabı bulunmuyor."}**
\`•\` Oynadığı Oyunlar: **${Regs ? Regs.game : "Kullanıcının oynadığı oyunlar bulunmuyor."}**
\`•\` Burç: **${Regs ? Regs.burç : "Kullanıcının burç bilgisi bulunmuyor."}**
\`•\` Randevu komutu kullanım sayısı: **${Prof ? Prof.randevu : 0}**

**❯ İzdivaç Bilgisi**
\`•\` Onaylanan randevu sayısı: **${Prof ? Prof.accept : 0}**
\`•\` Reddedilen randevu sayısı: **${Prof ? Prof.deny : 0}**
\`•\` Toplam beğeni sayısı: **${likeTop ? likeTop.like : 0}**
\`•\` Hakkında:
\`\`\`
${Regs ? Regs.about : "Kullanıcının hakkında bilgisi bulunmuyor."}
\`\`\`
`)
.setFooter(`Kullanıcıyı beğendiyseniz ${cfg.prefix}randevu @kullanıcı komutunu kullanarak randevu teklif edebilirsiniz. profili düzenlemek için ${cfg.prefix}profil-düzenle bilgi yazarak yapabilirsiniz.`)
message.channel.send(embeds)
    }
  })
};
module.exports.configuration = {
  name: "iprofil",
  aliases: ["profil", "profile"],
};