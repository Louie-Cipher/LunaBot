const profileModel = require('../mongoSchema/profile');

module.exports = async (client, member) => {

  let profile = await profileModel.create({
    userID: member.id,
    guildID: member.guild.id,
    currentXP: 0,
    levelXP: 1,
    coins: 200,
    bank: 200,
    lastEdit: Date.now
  });

  profile.save();

}