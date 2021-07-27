const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
  name: 'skip',
  aliases: ['pular', 'pulo', 'avancar', 'avançar', 'forceskip', 'fskip'],
  description: "pula a música em reprodução",
  inVoiceChannel: true,

  async execute(client, message, args) {

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(
      {embed: {color: '#ff5000', description: '❌ | Não há nenhuma música sendo reproduzida nesse momento'}}
    );

    if( message.member.voice.channel.members.size > 2 && !message.member.permissions.has('MOVE_MEMBERS'))
      return message.channel.send(
        {embed: {color: '#ff5000', description: '❌ | Para pular a música em reprodução e seguir para a próxima da lista,\nvocê precisa estar sozinho com o bot no canal de voz, ou ter a permissão `mover membros`'}}
      );

    client.distube.skip(message);
    message.channel.send({embed: {description: '⏭ | Música pulada'}})

    }
}