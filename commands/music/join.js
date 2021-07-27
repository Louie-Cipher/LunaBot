const Discord = require("discord.js");

module.exports = {
  name: 'join',
  aliases: ['entrar', 'puxar', 'mover', 'move'],
  description: "para ser movido para a call mencionada",

  async execute(client, message, args) {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]);

    if(!user) user = message.author;

  }
}