const Discord = require("discord.js");

module.exports = {
  name: 'ask',
  aliases: ['perguntar', 'pergunta', 'gênio', 'genio'],
  description: "faça uma pergunta aleatória, e eu lhe responderei com minha imensa sabedoria de bot",
  dmAllow: true,

  async execute(client, message, args) {

    var rand = Math.floor(Math.random() * 20);

    if (rand == 0) {
      var embedcolor = '#800000'
      var resposta = 'NÃO MESMO!'
      var description = 'de forma alguma'
    }
    else if (rand > 1 && rand < 10) {
      var embedcolor = '#ff0000'
      var resposta = 'NÃO'
      var description = 'negativo'
    }
    else if (rand == 10) {
      var embedcolor = '#ffff00'
      var resposta = 'TALVEZ...'
      var description = 'essa me deixou em dúvida.'
    }
    else if (rand > 10 && rand < 19) {
      var embedcolor = '#00ff00'
      var resposta = 'SIM'
      var description = 'positivo'

    }
    else if (rand == 19) {
      var embedcolor = '#00ff00'
      var resposta = 'COM CERTEZA!'
      var description = 'pode apostar que sim'
    }



    if (!args[0]) return message.reply({ content: `escreva sua pergunta após o comando, e eu responderei com minha imensa sabedoria.` })

    const embed = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setTitle(`**${resposta}**`)
      .setDescription(description)


    message.reply({ embeds: [embed] });


  }
}