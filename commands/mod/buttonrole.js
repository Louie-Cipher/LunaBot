const Discord = require('discord.js');
const disbut = require('discord-buttons');

module.exports = {
  name: 'buttonrole',
  aliases: ['buttonroles'],
  description: "Cria uma mensagem de adcionar cargos pelos botões",
  userPermissions: "MANAGE_ROLES",
  botPermission: "MANAGE_ROLES",
  
  async execute (client, message, args) {

    const channel = '835168243299778600';
    const role1 = message.guild.roles.cache.find(role => role.id === '824436817565712456');
    const role2 = message.guild.roles.cache.find(role => role.id === '824437091760603137');
    const role3 = message.guild.roles.cache.find(role => role.id === '824437131198857267');


    let button1 = new disbut.MessageButton()
      .setStyle('grey')
      .setLabel('ela/dela') 
      .setID('click_to_function');

    let button2 = new disbut.MessageButton()
      .setStyle('grey')
      .setLabel('ele/dele') 
      .setID('click_to_function');

    let button3 = new disbut.MessageButton()
      .setStyle('grey')
      .setLabel('elu/delu') 
      .setID('click_to_function');

    let buttonRow = new disbut.MessageActionRow()
      .addComponent(button1)
      .addComponent(button2)
      .addComponent(button3);

    let embed = new Discord.MessageEmbed()
      .setColor('#e42643')
      .setTitle('tags pronomes')
      .setDescription('clique nos botões abaixo de acordo com seus pronomes');

    message.channel.send({embed: embed, component: buttonRow});


  }
}