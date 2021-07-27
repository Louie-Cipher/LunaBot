const Discord = require("discord.js")

module.exports = {
  name: 'jokenpoold',
  aliases: ['jokenpôold', 'pptold'],
  description: "uma partida de pedra papel tesoura (versão antiga)",

  async execute(client, message, args) {
    var array1 = ["pedra", "papel", "tesoura"];

    var rand = Math.floor(Math.random() * array1.length);

    var bot = array1[rand];


    if (bot == "pedra") {
      botemoji = ":rock:"
    }
    else if (bot == "papel") {
      botemoji = ":page_facing_up:"
    }
    else if (bot == "tesoura") {
      botemoji = ":scissors:"
    }

    if (!args[0] || (args[0].toLowerCase() !== "pedra" && args[0].toLowerCase() !== "papel" && args[0].toLowerCase() !== "tesoura")) {
      message.reply("insira **pedra**, **papel** ou **tesoura** na frente do comando.");
    }
    else if (args[0].toLowerCase() == "papel" && bot == "pedra") {
      var resultado = "você ganhou, parabéns!"
    }
    else if (args[0].toLowerCase() == "papel" && bot == "papel") {
      var resultado = "empate. bom jogo."
    }
    else if (args[0].toLowerCase() == "papel" && bot == "tesoura") {
      var resultado = "você perdeu dessa vez."
    }
    else if (args[0].toLowerCase() == "tesoura" && bot == "pedra") {
      var resultado = 'você perdeu dessa vez.'
    }
    else if (args[0].toLowerCase() == "tesoura" && bot == "papel") {
      var resultado = 'você ganhou, parabéns!'
    }
    else if (args[0].toLowerCase() == "tesoura" && bot == "tesoura") {
      var resultado = 'empate. bom jogo.'
    }
    else if (args[0].toLowerCase() == "pedra" && bot == "pedra") {
      var resultado = 'empate. bom jogo.'
    }
    else if (args[0].toLowerCase() == "pedra" && bot == "papel") {
      var resultado = 'você perdeu dessa vez.'
    }
    else if (args[0].toLowerCase() == "pedra" && bot == "tesoura") {
      var resultado = 'você ganhou, parabéns!'
    }

    let embed = new Discord.MessageEmbed()
      .setColor(`#4cd8b2`)
      .addFields(
        { value: `eu escolhi **` + bot + `** ${botemoji} \n ${resultado}` }
      )
    message.channel.send(embed)

  }
}
