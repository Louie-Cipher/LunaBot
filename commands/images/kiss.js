const Discord = require('discord.js');

module.exports = {
  name: 'kiss',
  aliases: ['beijar', 'beijo'],
  description: "beija a pessoa mencionada",

  async execute(client, message, args) {

    var emojis = [
      '💖', '💞', '❤️', '💘', '💕', '💓', '💗', '💜', '💟', '💝', '💑', '🥰', '😘', '😚'
    ];
    var gifs = [
      'https://imgur.com/iclUiUN.gif | _ _', // Asuka e 
      'https://imgur.com/w1TU5mR.gif | _ _', // não sei
      'https://64.media.tumblr.com/708b2dc3e999b53b39a9e37100ce0454/dac7d7ae41a7f72e-ed/s640x960/922f2c56f2c29ad9c0a51ced4e5b0f446162eb65.gif | Noelle Stevenson / DreamWorks', // Netosa e Spinerela
      'https://64.media.tumblr.com/e6fcfe7456a834e50867de1719206591/faad2d5604ddc042-23/s400x600/628a604e591d76aaf19db8819a48a0c1eb99875a.gif | Noelle Stevenson / DreamWorks', // Adora e Felina
      'https://static.wikia.nocookie.net/dd6e84a8-4a4a-4aa5-8c79-0a053ac43bca | Noelle Stevenson / DreamWorks', //Netosa e Spinerela
      'https://steamuserimages-a.akamaihd.net/ugc/869616926014651303/CCCA817D55A8A75783497DBDDE851ABFCF6C8A61/ | Dontnod / Square Enix', //Max e Chloe
      'https://pa1.narvii.com/6932/6c64c2a01b84f4740b3b495835f0df7583d82173r1-540-303_hq.gif | Rebecca Sugar / Cartoon Network' // Rubi e Safira
    ];

    var emojiRand = emojis[Math.floor(Math.random() * emojis.length)];
    let gifRand = gifs[Math.floor(Math.random() * gifs.length)];

    let gifAndCopyright = gifRand.split('|')
    let mentioned = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (!mentioned) {
      return message.reply('você precisa mencionar alguém para beijar');
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#F5A9B8')
      .setDescription(` ${emojiRand} • ${message.author} beijou ${mentioned}`)
      .setImage(gifAndCopyright[0])
      .setFooter('©'+gifAndCopyright[1]);

    if(mentioned.id == client.user.id) embed.addFields({name: '\u200b', value: '😳 estou envergonhada 👉👈'})

    await message.channel.send(embed);
  }
}