const Discord = require('discord.js');

module.exports = {
  name: 'calc',
  aliases: ['calculadora', 'calculator'],
  description: "calculadora por reações com emojis",

  async execute(client, message, args) {

    var number1 = 0;
    var number2 = 0;

    var startEmbed = new Discord.MessageEmbed()
      .setColor('#f0f0f0')
      .setTitle('Calculadora');

    let messageEmbed = await message.channel.send(startEmbed)

    let line1 = await message.channel.send('1️⃣2️⃣3️⃣');
    line1.react('1️⃣'); line1.react('2️⃣'); line1.react('3️⃣');

    let line2 = await message.channel.send('4️⃣5️⃣6️⃣');
    line2.react('4️⃣'); line2.react('5️⃣'); line2.react('6️⃣');

    let line3 = await message.channel.send('7️⃣8️⃣9️⃣');
    line3.react('7️⃣'); line3.react('8️⃣'); line3.react('9️⃣');

    let line4 = await message.channel.send('➕0️⃣➖');
    line4.react('➕'); line4.react('0️⃣'); line4.react('➖');

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.id == line1.id) {
        if (reaction.emoji.name === '1️⃣') { number1 = 1; }
        if (reaction.emoji.name === '2️⃣') { number1 = 2; }
        if (reaction.emoji.name === '3️⃣') { number1 = 3; }
      }

      if (reaction.message.id == line2.id) {
        if (reaction.emoji.name === '4️⃣') { number1 = 4; }
        if (reaction.emoji.name === '5️⃣') { number1 = 5; }
        if (reaction.emoji.name === '6️⃣') { number1 = 6; }
      }

      if (reaction.message.id == line3.id) {
        if (reaction.emoji.name === '7️⃣') { number1 = 7; }
        if (reaction.emoji.name === '8️⃣') { number1 = 8; }
        if (reaction.emoji.name === '9️⃣') { number1 = 9; }
      }

      message.channel.send(number1);

    }
    )
  }
}