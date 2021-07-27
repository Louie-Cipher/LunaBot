const Discord = require("discord.js");
const disbutton = require('discord-buttons');

module.exports = {
  name: 'disbutton',
  aliases: ['testbotão', 'testbotao', 'testbuttons', 'testbutton'],
  description: "teste de botão",

  async execute(client, message, args) {


    /*let button = new disbut.MessageButton()
    .setStyle('red')
    .setLabel('botão teste') 
    .setID('clique_aqui');
    */

    let option = new disbutton.MessageMenuOption()
      .setLabel('Your Label')
      .setEmoji('🍔')
      .setValue('menuid')
      .setDescription('Custom Description!')
    
    let select = new disbutton.MessageMenu()
      .setID('customid')
      .setPlaceholder('Click me! :D')
      .setMaxValues(1)
      .setMinValues(1)
      .addOption(option)

    message.channel.send('Text with menu!', select);

    //message.channel.send('olha, uma mensagem com um botãozinho legal', button);


  }
}