const Discord = require("discord.js");

module.exports = {
  name: 'userinfo',
  aliases: ['user'],
  description: "exibe informações sobre sua conta, ou do usuário mencionado",

  async execute(client, message, args) {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]);

    if(!user && args[0]) return message.channel.send(`Usuário "${args[0]}" não encontrado`);

    if(!user) user = message.author;

    let member = await message.guild.members.cache.get(user.id);

    let avatar = user.avatarURL({ dynamic: true, format: "png"});

    const dateNow = new Date();

    const userCreated = {
      year: user.createdAt.getFullYear(),
      month: user.createdAt.getMonth() + 1,
      day: user.createdAt.getDate(),
      dayWeek: user.createdAt.getDay(),
      hour: user.createdAt.getHours(),
      minute: user.createdAt.getMinutes(),
      second: user.createdAt.getSeconds()
    }

    let dateOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      weekday: 'short',
      hourCycle: 'h23'
    };

    const userCreatedFormated = `${userCreated.day}/${userCreated.month}/${userCreated.year} - ${userCreated.hour}:${userCreated.minute}`;

    const userTime = new Date(dateNow - user.createdAt);

    const userTimeFormated = `a ${userTime.getFullYear() - 1970} ano(s), ${userTime.getMonth() + 1} mes(es), ${userTime.getDate()} dia(s), ${userTime.getHours()} hora(s) e ${userTime.getMinutes()} minuto(s)`

    let embed = new Discord.MessageEmbed()
      .setColor('#008f81')
      .setTitle(`${user.tag}`)
      .setDescription(`${user}`)
      .setThumbnail(avatar)
      .setFooter('(Data e hora em GMT-3 | Horário de Brasilia)')
      .addFields(
        {name: '🆔 Discord ID', value: `${user.id}`, inline: true},
        {
          name: '📅 Conta criada em',
          value: `${userCreatedFormated} \n${userTimeFormated}`,
          inline: true
        }
      );

    if(member){

      //member = await message.guild.members.fetch(user);

      const memberTime = new Date(dateNow - member.joinedAt);
      
      const memberJoined = {
        year: member.joinedAt.getFullYear(),
        month: member.joinedAt.getMonth() + 1,
        day: member.joinedAt.getDate(),
        dayWeek: member.joinedAt.getDay(),
        hour: member.joinedAt.getHours(),
        minute: member.joinedAt.getMinutes(),
        second: member.joinedAt.getSeconds()
      }

      const memberJoinedFormated = `${memberJoined.day}/${memberJoined.month}/${memberJoined.year} - ${memberJoined.hour}:${memberJoined.minute}`;

      const memberTimeFormated = `a ${memberTime.getFullYear() - 1970} ano(s), ${memberTime.getMonth() + 1} mes(es), ${memberTime.getDate()} dia(s), ${memberTime.getHours()} hora(s) e ${memberTime.getMinutes()} minuto(s)`;

      embed.addFields(
        {
          name: '✨ Entrou no servidor em',
          value: `${memberJoinedFormated} \n${memberTimeFormated}`
        })

      if(member.premiumSince) {

        const memberBoosted = {
          year: member.premiumSince.getFullYear(),
          month: member.premiumSince.getMonth() + 1,
          day: member.premiumSince.getDate(),
          dayWeek: member.premiumSince.getDay(),
          hour: member.premiumSince.getHours(),
          minute: member.premiumSince.getMinutes(),
          second: member.premiumSince.getSeconds()
        }

        embed.addFields(
          {name: '<:boost:868983673641381908> impulsionando o servidor desde', value: `${memberBoosted.day}/${memberBoosted.month}/${memberBoosted.year} - ${memberBoosted.hour}:${memberBoosted.minute}` }
        )
      }

      if (member.nickname){
        embed.addFields(
        {
          name: 'nickname no servidor', value: member.nickname
        })
      }
    }

    message.channel.send(embed);

  }
}
