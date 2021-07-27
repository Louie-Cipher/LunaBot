const Discord = require('discord.js');
const fs = require('fs');
const guildModel = require('../../mongoSchema/guild');

module.exports = {
  name: 'help',
  aliases: ['ajuda', 'commands', 'comandos', 'cmds', 'info'],
  description: "mostra todos os meus comandos e a descrição deles, ou seja, esse comando 😉 (quebra da 4° parede?)",
  dmAllow: true,

  async execute(client, message, args) {

    const funNames = ['fun', 'diversão', 'jogos', 'games', 'game'];
    const geralNames = ['geral', 'util', 'utilidades', 'general'];
    const imagesNames = ['images', 'imagens', 'img', 'imgs', 'memes'];
    const modNames = ['mod', 'moderação', 'moderacao', 'config', 'adm', 'admin', 'administração', 'administracao'];
    const moneyNames = ['money', 'dinheiro', 'economia', 'lunaBits', 'bits'];
    const musicNames = ['music', 'música', 'musica', 'player', 'play'];

    let embed = new Discord.MessageEmbed()
      .setColor('#00eeff')

    var geralCommands = fs.readdirSync(`./commands/geral`);
    var imagesCommands = fs.readdirSync(`./commands/images`);
    var modCommands = fs.readdirSync(`./commands/mod`);
    var moneyCommands = fs.readdirSync(`./commands/money`);
    var musicCommands = fs.readdirSync(`./commands/music`);

    if (!args[0] || ( !funNames.includes(args[0]) && !geralNames.includes(args[0]) && !imagesNames.includes(args[0]) && !modNames.includes(args[0]) && !moneyNames.includes(args[0]) && !musicNames.includes(args[0]) ) ) {

      if(message.channel.type != 'dm') {
        let guildData = await guildModel.findOne({guildID: message.guild.id});
        var prefix = guildData.prefix;
        embed.setDescription(`meu prefixo padrão é ' (aspas simples)\nmeu prefixo nesse servidor é ${prefix}`);
      } else {
        var prefix = "'";
        embed.setDescription(`meu prefixo padrão é ' (aspas simples)
        Caso deseje, entre no servidor de suporte e demais interações da Luna: [Luna Lab](https://discord.gg/VFJAqE7Uz6)`)
      }

      embed
        .setTitle('🌙 Olá, eu sou a Luna')
        .addFields(
          {
            name: '\u200b',
            value: 'Um bot experimental com comandos de moderação, player de música, mini jogos, sistema de economia e muito mais'
          },
          {
            name: '\u200b',
            value: `para ver os comandos de cada categoria, digite "${prefix}help" seguido do nome da categoria
            exemplo: "${prefix}help mod" ou "${prefix}help musica"`
          },
          {
            name: 'Geral',
            value: '` ou: "util", "utilidades", "general"`\ncomandos diversos e utilidades`',
            inline: true
        },
        {
          name: 'Diversão',
          value: '` ou: "fun", "jogos", "games"`\nmini jogos da luna, valendo moedas ou não`',
          inline: true
        },
        {
          name: 'Imagens',
          value: '` ou: "images", "img", "memes"`\ngeradores de memes, ou interações como "kiss" e "hug"`',
          inline: true
        },
        {
          name: 'Música',
          value: '` ou: "music", "player"`\nreprodução de música`',
          inline: true
        },
        {
          name: 'Moderação',
          value: '` ou: "mod", "admin", "adm"`\ncomandos para organização e controle do servidor e seus membros`',
          inline: true
        },
        {
          name: 'Economia',
          value: '` ou: "money", "dinheiro", "lunaBits", "bits"`\ncomandos de gerenciamento das suas LunaBits, as moedas da Luna`',
          inline: true
        }
      );

    }

    if (funNames.includes(args[0]) ) {
      embed.setTitle('Comandos de Diversão e mini jogos')
      embed.addFields({name: '\u200b', value: '(alguns valendo seus LunaBits)\n'})
      const funCommands = fs.readdirSync(`./commands/fun`);
      for (const file of funCommands) {
        var cmd = require(`../fun/${file}`);
        embed.addField(cmd.name,
          `\`${cmd.aliases}\`
          ${cmd.description}`,
          true);
      }
    };

    if (geralNames.includes(args[0]) ) {
      embed.setTitle('Comandos gerais');
      embed.addFields({name: '\u200b', value: 'ccomandos diversos e utilidades\n'});
      const geralCommands = fs.readdirSync(`./commands/geral`);
      for (const file of geralCommands) {
        var cmd = require(`../geral/${file}`);
        embed.addField(cmd.name,
          `\`${cmd.aliases}\`
          ${cmd.description}`,
          true);
      }
    };

    if (imagesNames.includes(args[0]) ) {
      embed.setTitle('Comandos de imagens');
      embed.addFields({name: '\u200b', value: 'comandos de geração de memes ou outros comandos relacionados a imagens\n'});
      const imagesCommands = fs.readdirSync(`./commands/images`);
      for (const file of imagesCommands) {
        var cmd = require(`../images/${file}`);
        embed.addField(cmd.name,
          `\`${cmd.aliases}\`
          ${cmd.description}`,
          true);
      }
    };

    if (modNames.includes(args[0]) ) {
      embed.setTitle('Comandos de moderação');
      embed.addFields({name: '\u200b', value: 'comandos para organização e controle do servidor e seus membros\n'});
      const modCommands = fs.readdirSync(`./commands/mod`);
      for (const file of modCommands) {
        var cmd = require(`../mod/${file}`);
        embed.addField(cmd.name,
          `\`${cmd.aliases}\`
          ${cmd.description}`,
          true);
      }
    };

    if (moneyNames.includes(args[0]) ) {
      embed.setTitle('Comandos de economia');
      embed.addFields({name: '\u200b', value: 'comandos de gerenciamento das suas LunaBits, as moedas da Luna\n'});
      const moneyCommands = fs.readdirSync(`./commands/money`);
      for (const file of moneyCommands) {
        var cmd = require(`../money/${file}`);
        embed.addField(cmd.name,
          `\`${cmd.aliases}\`
          ${cmd.description}`,
          true);
      }
    };

    if (musicNames.includes(args[0]) ) {
      embed.setTitle('Comandos de música');
      embed.addFields({name: '\u200b', value: 'comandos da reprodução de música\n'});
      const musicCommands = fs.readdirSync(`./commands/music`);
      for (const file of musicCommands) {
        var cmd = require(`../music/${file}`);
        embed.addField(cmd.name,
          `\`${cmd.aliases}\`
          ${cmd.description}`,
          true);
      }
    };

    message.channel.send(embed);


  }
}