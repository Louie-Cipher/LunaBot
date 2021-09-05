const Discord = require("discord.js");

module.exports = {
  name: 'invite',
  aliases: ['convite', 'link'],
  description: "link para adcionar o bot ao seu servidor",
  dmAllow: true,

  async execute(client, message, args) {

    var oauthlink = 'https://discord.com/api/oauth2/authorize?client_id=832275775645417553&permissions=8&scope=bot';

    let embed = new Discord.MessageEmbed()
      .setColor('#00ffff')
      .setTitle('🌙 Adcione a LunaBot ao seu servidor 🌙')
      .setDescription(`Para adcionar a LunaBot em seu servidor [clique aqui](${oauthlink})
      \nCaso deseje, acesse também o servidor de suporte e demais interações da Luna: [LunaLab](https://discord.gg/VFJAqE7Uz6)`);

    message.reply({ embeds: [embed] });

  }
}