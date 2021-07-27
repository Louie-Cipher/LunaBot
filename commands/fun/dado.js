const Discord = require("discord.js");

module.exports = {
  name: 'dado',
  aliases: ['d', 'rolar', 'random', 'aleatorio', 'aleatório'],
  description: "irei gerar um número aleatório dentro do intervalo determinado (se nenhum número for especificado, o dado será de 6 lados)",
  dmAllow: true,

  async execute(client, message, args) {

    var var2 = parseInt(args[1]);
    var var3 = parseInt(args[2]);

    if (args[0]) {var d1 = 6}
    else{ var d1 = parseInt(args[0]) }

    if (args[1]) {var d2 = 6}
    else{ var d2 = parseInt(args[1]) }

    if (args[0]) {var d1 = 6}
    else{ var d1 = parseInt(args[0]) }

    var total = (var1 + var2 + var3);

    var d1 = Math.floor(Math.random() * var1);
    var d2 = Math.floor(Math.random() * var2);
    var d3 = Math.floor(Math.random() * var3);

    var result = d1;
    if (args[1]) {result = d1 + d2}
    if (args[2]) {result = d1 + d2 + d3}

    let embed = new Discord.MessageEmbed()
      .setColor('#4cd8b2')
      .setTitle(`:game_die:  **${result}**  :game_die:`)
      .setFooter(`valor total de todos os dados: ${total}`);

    if (args[1]) {
      embed.addFields(
        {name: 'Dado n°1:' , value: `${d1}`},
        {name: 'Dado n°2:' , value: `${d2}`} );
    }
    if (args[2]) {
      embed.addFields({name: 'Dado n°3:', value: `${d3}`})
    }

    //.addFields( {name: 'Dado um:' , value: d1 , true}, {name: 'Dado dois:' , value: d2 , true} )
    

    message.channel.send(embed);


  }
}