const Discord = require("discord.js");
const Levels = require('discord-xp');
const profileModel = require('../mongoSchema/profile');

module.exports = {
  
  async level(client, message) {

    let profileData;

    try {
      profileData = await profileModel.findOne({userID: message.author.id});

      if(!profileData) {
        let profile = await profileModel.create({
          userID: message.author.id,
          guildID: message.guild.id,
          currentXP: 0,
          levelXP: 1,
          coins: 200,
          bank: 200,
          lastEdit: Date.now()
        })
        profile.save();

      }
    } catch (erro) {
      console.log(erro)
    }

    const randomXP = Math.ceil(Math.random() * 4) + 1;

    const hasLevedUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);



  }

}