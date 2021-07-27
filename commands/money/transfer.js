const Discord = require("discord.js");
const profileModel = require('../../mongoSchema/profile');

module.exports = {
  name: 'transfer',
  aliases: ['transferir', 'transferencia', 'pay', 'pagar', 'pix'],
  description: "transfere o valor da sua carteira para a carteira do usuário mencionado",

  async execute(client, message, args) {

    let valor = parseInt(args[1]);

    let user2 = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (args[0] && !user2)
      return message.channel.send({embed: {color: '#b3c20c', title: 'usuário informado não encontrado'}});

    if (user2.bot)
      return message.channel.send(
        {embed: { title: `${user.tag} <:bot_tag:861720010283417611>` , description: 'Bip Bop | Bots não possuem perfil ou valor em LunaBits' }}
      );

    let profileData1 = await profileModel.findOne({userID: message.author.id});
    let profileData2 = await profileModel.findOne({userID: user2.id});

    if (!profileData2) return message.channel.send({embed: {color: '#b3c20c', title: 'usuário informado não possui LunaBits ou um perfil na Luna'}})

    if(!valor || valor < 1) return message.channel.send({embed: {color: '#f0f000', title: 'informe um valor para transferir', description: 'o valor precisa ser um número inteiro (sem virgula) e positivo'}});

    let failEmbed = new Discord.MessageEmbed()
      .setColor('#b3c20c')
      .setTitle('Você não possui esse valor na carteira para depositar')
      .setDescription(`Você atualmente tem ${profileData.coins} na carteira, e ${profileData.bank} no banco`);

    if( profileData1.coins < valor ) return message.channel.send(failEmbed);

    let profileUpdate1 = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      }, {
          $inc:{
            coins: -valor
          },
          lastEditMoney: Date.now()
        }
    );
    profileUpdate1.save();

    let embed = new Discord.MessageEmbed()
      .setColor('#00ffff')
      .setTitle('Transferência efetuada com sucesso')
      .addFields(
        {name: 'valor', value: valor,},
        {name: 'seu saldo atual', value: (profileData1.coins - valor)},
        {name: `saldo atual de ${user2.tag}`, value: (profileData2.bank + valor)}
      );

    message.channel.send(embed);

  }
}