const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
  name: 'stop',
  aliases: ['disconect', 'dc', 'leave', 'forcestop', 'fstop', 'parar'],
  description: "para a reprodução de música e desconecta o bot do canal de voz",
  inVoiceChannel: true,

  async execute(client, message, args) {

    const queue = client.distube.getQueue(message)

    if (!queue) return message.channel.send(
      {embed: {color: '#ff5000', description: '❌ | Não há nenhuma música sendo reproduzida nesse momento'}}
    );

    if( message.member.voice.channel.members.size > 2 && !message.member.permissions.has('MOVE_MEMBERS'))
      return message.channel.send(
        {embed: {color: '#ff5000', description: '❌ | Para parar a reprodução de música e desconectar o bot do canal de voz,\nvocê precisa estar sozinho com o bot na call, ou ter a permissão `mover membros`'}}
      );

    client.distube.stop(message);

    message.channel.send({embed: {color: '#00ff50', description: '⏹ | Parando a reprodução de música'}});

  }
}