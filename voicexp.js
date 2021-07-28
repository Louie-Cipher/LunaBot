const profileModel = require('./mongoSchema/profile');
module.exports = {

  async voiceXpAdd(client) {

    console.log('-- adcionando Voice XP --');

    let randomVoiceXP = Math.ceil(Math.random() * 3) + 2;

    let guildsCache = client.guilds.cache;

    for (var guildCached of guildsCache) {

      let guild = guildCached[1];

      console.log('guild: ' + guild.name);

      let membersCache = guild.members.cache;

      for (var memberCached of membersCache) {

        let member = memberCached[1];

        console.log('membro: ' + member.user.tag);

        if (member.user.bot) return;
        if (!member.voice.channel) return;
        if (member.voice.channel.members.size == 1) return;
        if (member.voice.deaf) return;
        if (member.voice.mute) return;

        console.log('adcionando voice XP');

        try {
          let profileData = await profileModel.findOne({ userID: member.user.id });

          if (!profileData) {
            let profileNew = await profileModel.create({
              userID: member.user.id,
              chatXP: 1,
              voiceXP: randomVoiceXP,
              coins: 100,
              bank: 200,
              lastEditXP: Date.now(),
              lastEditMoney: Date.now(),
              lastDaily: Date.now(),
              created: Date.now()
            });
            profileNew.save();

            // ----AUMENTAR XP ----//

          } else if (profileData) {

            let voiceXpToAdd = await profileModel.findOneAndUpdate(
              {
                userID: member.user.id,
              }, {
                $inc: { voiceXP: randomVoiceXP },
                lastEditXP: Date.now()
              }
            );
            voiceXpToAdd.save();
          }


        } catch (erro) {
          console.log(erro);
        }



      };

  };

  }
}
