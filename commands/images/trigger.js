const canvacord = require("canvacord");
const Discord = require('discord.js');

module.exports = {
  name: 'trigger',
  aliases: ['triggered'],
  description: "adciona o efeito TRIGGERED em uma imagem",
  dmAllow: true,

  async execute(client, message, args) {

    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvas.trigger(avatar);
    let attachment = new Discord.MessageAttachment(image, `triggered.gif`);
    message.channel.send(attachment);

  }
}