module.exports = {

  async clickButton(button) {

  client.on('clickButton', async (button) => {

  const rolesMessage = '864326290583715900';
    
  if (button.clicker.user.bot) return;
  if (button.message.id != rolesMessage) return;

  let button1 = new disbutton.MessageButton()
      .setStyle('grey')
      .setLabel('ela/dela') 
      .setID('ela/dela');

    let button2 = new disbutton.MessageButton()
      .setStyle('grey')
      .setLabel('ele/dele') 
      .setID('ele/dele');

    let button3 = new disbutton.MessageButton()
      .setStyle('grey')
      .setLabel('elu/delu') 
      .setID('ele/dele');

    let buttonRow = new disbutton.MessageActionRow()
      .addComponent(button1)
      .addComponent(button2)
      .addComponent(button3);

  const role1 = button.guild.roles.cache.find(role => role.id === '824436817565712456');
  const role2 = button.guild.roles.cache.find(role => role.id === '824437091760603137');
  const role3 = button.guild.roles.cache.find(role => role.id === '824437131198857267');

  if (button.id == 'ela/dela'){
    await button.guild.members.cache.get(button.clicker.member).roles.add(role1);
    console.log('cargo 1')
  };
    if (button.id == 'ele/dele'){
      console.log('cargo 2')
    await button.guild.members.cache.get(button.clicker.member).roles.add(role2);
  };
    if (button.id == 'elu/delu'){
      console.log('cargo 3')
    await button.guild.members.cache.get(button.clicker.member).roles.add(role3);
  };

});


  }
}