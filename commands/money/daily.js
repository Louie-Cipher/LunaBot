const Discord = require("discord.js");
const profileModel = require('../../mongoSchema/profile');

module.exports = {
  name: 'daily',
  aliases: ['diario', 'diário'],
  description: "resgata a sua recompensa diária, ganhando entre 150 a 300 LunaBits",

  async execute(client, message, args) {

    let failEmbed = new Discord.MessageEmbed()
      .setColor('#b3c20c')
      .setTitle('Ei, você já resgatou sua reconpensa hoje!')
      .setDescription('⏳🌙 Volte amanhã para resgatar mais LunaBits')
      .setFooter('OBS: se você começou a usar a Luna hoje,\ndeve esperar até amanhã para resgatar sua recompensa');

    var randomCoins = Math.floor(Math.random() * 150) + 150;

    let profileCheck = await profileModel.findOne({userID: message.author.id});
    let dateNow = new Date()

    let lastDaily = new Date(profileCheck.lastDaily);

    if (lastDaily.getDate() == dateNow.getDate() && lastDaily < 183600 )
      return message.channel.send(failEmbed);

    let profileData = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      }, {
          $inc: {coins: randomCoins},
          lastDaily: Date.now()
        }
    )
    profileData.save();

    let embed = new Discord.MessageEmbed()
      .setColor('#00ffff')
      .setTitle('Recompensa diária')
      .setDescription(`Parabéns! você ganhou **${randomCoins} LunaBits** hoje!
      agora voce possui ${profileData.bank + profileData.coins + randomCoins} Bits no total`)
      .setFooter('volte amanhã para resgatar mais LunaBits');

    message.channel.send(embed);


  }
}