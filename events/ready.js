const cfg = require("../config.json")
const client = global.client;
module.exports = async () => {
  console.log("Bot aktif!");
  setInterval(() => {
  const reloadStatus = Math.floor(Math.random() * (cfg.status.length));
  client.user.setActivity(`${cfg.status[reloadStatus]}`);
  }, 60000)
  const x = client.channels.cache.get(cfg.sesKanalı)
  if(x) x.join().catch(err => console.log("Ses Kanalına Bağlanamadı."))
}
module.exports.configuration = {
  name: "ready"
}