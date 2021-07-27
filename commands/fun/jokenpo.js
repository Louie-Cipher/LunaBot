const Discord = require('discord.js');

module.exports = {
  name: 'jokenpo',
  aliases: ['jokenpô', 'ppt', 'pedra', 'papel', 'tesoura', 'pedrapapeltesoura'],
  description: "uma partida de pedra papel tesoura (sem apostar LunaBits)",

  async execute(client, message, args) {

    var array1 = ["pedra", "papel", "tesoura"];
    var rand = Math.floor(Math.random() * array1.length);
    var bot = array1[rand];
    var player

    const pedra_emoji = '🪨';
    const papel_emoji = '📄';
    const tesoura_emoji = '✂️';


    let startEmbed = new Discord.MessageEmbed()
      .setColor('#f0f0f0')
      .setTitle('Jokenpo')
      .addFields(
        { name: '🪨    |   📄   |   ✂️', value: `pedra, papel, tesoura\n\njogue clicando nos emojis abaixo` }
      );


    let messageEmbed = await message.channel.send(startEmbed);
    messageEmbed.react(pedra_emoji);
    messageEmbed.react(papel_emoji);
    messageEmbed.react(tesoura_emoji);

    for (let i = 0; i < 5; i++) {


      client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.id == messageEmbed.id) {
          if (reaction.emoji.name === pedra_emoji) {
            var player = "pedra"
          }
          if (reaction.emoji.name === papel_emoji) {
            var player = "papel"
          }
          if (reaction.emoji.name === tesoura_emoji) {
            var player = "tesoura"
          }
        } else {
          return;
        }

        if (player == "pedra" && bot == "pedra") {
          var result = 'empate'
        }
        else if (player == "papel" && bot == "pedra") {
          var result = 'ganhou'
        }
        else if (player == "tesoura" && bot == "pedra") {
          var result = 'perdeu'
        }
        else if (player == "pedra" && bot == "papel") {
          var result = 'perdeu'
        }
        else if (player == "papel" && bot == "papel") {
          var result = 'empate'
        }
        else if (player == "tesoura" && bot == "papel") {
          var result = 'ganhou'
        }
        else if (player == "pedra" && bot == "tesoura") {
          var result = 'ganhou'
        }
        else if (player == "papel" && bot == "tesoura") {
          var result = 'perdeu'
        }
        else if (player == "tesoura" && bot == "tesoura") {
          var embedresult = "Empate ✂️✂️ foi um belo jogo..."
        }

        if (result == 'ganhou') {
          var embedcolor = '#00ff00'
          var embedresult = 'Parabéns! você ganhou.'
        }
        else if (result == 'empate') {
          var embedcolor = '#ffff00'
          var embedresult = 'Empate. Bom jogo.'
        }
        else if (result == 'perdeu') {
          var embedcolor = 'ff0000'
          var embedresult = 'Você perdeu. mais sorte na próxima vez.'
        }


        resultEmbed = new Discord.MessageEmbed()
          .setColor(embedcolor)
          .setTitle('Jokenpo')
          .addFields(
            { name: '🪨  |  📄  |  ✂️', value: `eu escolhi **${bot}**. ${embedresult}` }
          );


        //messageEmbed.edit(newembed)

        /*function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        sleep(5000).then(() => {messageEmbed.edit(embed)});*/

        messageEmbed.edit(resultEmbed)



      })

    }

  }
}