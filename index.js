const { Discord, Client, MessageEmbed } = require("discord.js")
const client = global.client = new Client({fetchAllMembers: true})
const fs = require("fs")
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const cfg = require("./config.json")
const mongoose = require("mongoose")
const logs = require('discord-logs')
logs(client);
require("./functions.js")(client, cfg, moment);
mongoose.connect(cfg.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const commands = new Map();
global.commands = commands;
const aliases = new Map();
global.aliases = aliases;
global.client = client;

fs.readdir("./commands", (err, files) => {
  if (err) return console.error(err);
  files = files.filter(file => file.endsWith(".js"));
  console.log(`${files.length} commands will be installed.`);
  files.forEach(file => {
    let prop = require(`./commands/${file}`);
    if (!prop.configuration) return;
    console.log(`COMMAND =>  Installing the ${prop.configuration.name} command.`);
    if (typeof prop.onLoad === "function") prop.onLoad(client);
    commands.set(prop.configuration.name, prop);
    if (prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop));
  });
});

fs.readdir("./events", (err, files) => {
  if (err) return console.error(err);
  files.filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./events/${file}`);
    if (!prop.configuration) return;
    client.on(prop.configuration.name, prop);
  });
});

client.on("message", (message) => {
  if (message.author.bot ||!message.content.startsWith(cfg.prefix) || !message.channel || message.channel.type == "dm") return;
    const embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}));
    let args = message.content.substring(cfg.prefix.length).split(" ");
    let command = args[0];
    let bot = message.client;
    args = args.splice(1);
    let calistirici;
    if (commands.has(command)) {
    calistirici = commands.get(command);
    calistirici.execute(bot, message, args, embed);
    } else if (aliases.has(command)) {
    calistirici = aliases.get(command);
    calistirici.execute(bot, message, args, embed);
   }
});

client.login(cfg.token).then(x => console.log("Tokenim Kalktı")).catch(e => console.error("Tokenim İndi"))