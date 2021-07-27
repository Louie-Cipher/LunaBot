const Discord = require('discord.js');

module.exports = {

  async lunaHello(message, prefix) {

    let lunaHelloEmbed = new Discord.MessageEmbed()
      .setColor('#00a1a1')
      .setTitle('🌙 Olá, eu sou a Luna')
      .setDescription(
        `um bot experimental com mini jogos e player de música,
        criado pela Louie.
        Meu prefixo padrão é ' (aspas simples)
        Meu prefixo nesse servidor é ${prefix}
        para saber mais informações, use ${prefix}help`);

    message.channel.send(lunaHelloEmbed);
  },

  blockedCommands: new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription('❌ Ei, você não pode usar comandos da Luna nesse chat'),

  inVoiceChannel: new Discord.MessageEmbed()
    .setColor('#ffff00')
    .setDescription('🔊 você precisa estar em um canal de voz para usar esse comando'),

  nsfw: new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('❎ esse comando só pode ser usado em um canal marcado como NSFW')
    .setImage('https://i.kym-cdn.com/entries/icons/original/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.png')
    .setFooter('De acordo com as diretrizes do Discord, mensagens que possuirem conteúdo explícito, ou NSFW (Not Safe For Work), só podem ser enviados em um canal marcado como de conteúdo adulto'),

  async userPermission(client, message, cmd) {
    const userPermissionEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Você é fraco, lhe falta permissão para usar esse comando')
      .setThumbnail('https://i.imgur.com/HMbty0g.jpeg')
      .setFooter(`para usar esse comando, é necessário a permissão "${cmd.userPermissions}"`);
    message.channel.send(`${message.author}`, userPermissionEmbed);
  },

  async botPermission(client, message, cmd){
    const botPermissionEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('eu não tenho permissão para realizar essa função.')

    if(message.member.permissions.has('MANAGE_ROLES')){
      botPermission.setDescription(
        'Se deseja utilizar esse comando, edite minhas permissões nas configurações de cargos do servidor')
        .setFooter(`é preciso adcionar "${cmd.botPermissions}" a lista de permissões do meu cargo`);
    } else {
      botPermission.setDescription('Por favor, contate os administradores do servidor para mais informações') }
    message.channel.send(`${message.author}`, botPermissionEmbed);
  },


}