const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
  name: 'filter',
  aliases: ['filters', 'filtro', 'efeito'],
  description: "adciona um filtro de áudio ao player de música",
  inVoiceChannel: true,

  async execute(client, message, args) {

    let embed = new Discord.MessageEmbed()
      .setColor('#00ff50')
      .setTitle('Insira o nome do filtro após o comando')
      .setDescription(
        `**exemplo: a.filter vaporwave**
        3d
        bassboost
        echo
        karaoke
        nightcore
        vaporwave
        flanger
        gate
        haas
        reverse
        surround
        mcompand
        phaser
        tremolo
        earwax`)

    if (!args[0]) return message.channel.send(embed);

    const filterName = args[0];

    client.distube.setFilter(message, filterName);

  }
}