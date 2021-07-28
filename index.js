const Discord = require('discord.js');
const DisTube = require('distube');
const disbutton = require('discord-buttons');
const fs = require('fs');
require('dotenv').config();

const mongoose = require('./mongoose');
const embeds = require('./embeds.js');
const distubeEvents = require('./distubeEvents.js');
const profileModel = require('./mongoSchema/profile');
const guildModel = require('./mongoSchema/guild');

//const voicexp = require('./voicexp')

var prefix = "'";

const client = new Discord.Client({ partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION'] });
disbutton(client);
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: true });

mongoose.init();

client.distube
  .on('playSong', async (message, queue, song) => {
    try {
      distubeEvents.playSong(message, queue, song);
    } catch (err) {
      message.channel.send('`houve um erro ao enviar essa mensagem`');
      console.log(err);
    }
  })
  .on('addSong', async (message, queue, song) => {
    try {
      distubeEvents.addSong(message, queue, song);
    } catch (err) {
      message.channel.send('`houve um erro ao enviar essa mensagem`');
      console.log(err);
    }
  })
  .on("playList", (message, queue, playlist, song) => {
    try {
      distubeEvents.playList(message, queue, playlist, song);
    } catch (err) {
      message.channel.send('`houve um erro ao enviar essa mensagem`');
      console.log(err);
    }
  })
  .on("addList", (message, queue, playlist) => {
    try {
      distubeEvents.addList(message, queue, playlist);
    } catch (err) {
      message.channel.send('`houve um erro ao enviar essa mensagem`');
      console.log(err);
    }
  })
  .on('error', (message, e) => {
    console.error(e)
    message.channel.send(`Houve um erro a executar essa ação: \n${e}`)
  });

client.commands = new Discord.Collection();

const mainFolderCommands = fs.readdirSync('./commands');

for (const subFolder of mainFolderCommands) {

  var categoryFolder = fs.readdirSync(`./commands/${subFolder}`);

  for (const file of categoryFolder) {
    var cmd = require(`./commands/${subFolder}/${file}`);
    client.commands.set(cmd.name, cmd);
  }

}

client.on('ready', async () => {

  console.log('Carregando');
  console.log('_'.repeat(27));
  client.commands.forEach(cmd => {
    console.log('\x1b[4m%s\x1b[0m', '| ' + cmd.name + ' '.repeat(15 - cmd.name.length) + '| ✅  |')
  });
  console.log('\x1b[4m%s\x1b[0m', `|| ${client.user.tag} online! 🌎  ||`);

  let activities = [
    `Utilize 'help para ver uma lista com todos os meus comandos`,
    `Olá, eu sou a Luna. um bot experimental criado pela Louie.`,
    `estou em ${client.guilds.cache.size} servidores.`,
    `${client.users.cache.size} usuários.`
  ],
    i = 0;

  setInterval( () =>
    client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'PLAYING' }),
    1000 * 15);

});

client.on('message', async message => {

  if (message.author.bot) return;

  if (message.channel.type != 'dm') {

    //---- CRIAR PERFIL ----//

    try {
      let profileData = await profileModel.findOne({ userID: message.author.id });

      if (!profileData) {
        let profileNew = await profileModel.create({
          userID: message.author.id,
          chatXP: 1,
          voiceXP: 1,
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

        var randomXP = Math.ceil(Math.random() * 3) + 3;
        var cooldownXP = new Date(Date.now() - profileData.lastEditXP)

        if (cooldownXP > 15) {

          let xpToAdd = await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            }, {
              $inc: { chatXP: randomXP },
              lastEditXP: Date.now()
            }
          );
          xpToAdd.save()
        }

      }
    } catch (erro) {
      console.log(erro)
    }

    //---- VERIFICAR / CRIAR GUILD CONFIG ----//

    try {
      let guildData = await guildModel.findOne({ guildID: message.guild.id });

      if (!guildData) {
        let guildNew = await guildModel.create({
          guildID: message.guild.id,
          prefix: "'",
          added: Date.now(),
          lastEdit: Date.now()
        });
        guildNew.save();

      } else if (guildData) {
        prefix = guildData.prefix;
      }
    } catch (erro) {
      console.log(erro)
    }

  

  if (message.content.startsWith('<') && message.content.includes(client.user.id) && message.mentions.users.first() == client.user) {
    try {
      embeds.lunaHello(message, prefix)
    } catch (erro) {
      console.log(erro);
    }
  }

  }

  //---- VERIFICAÇÃO COMANDO E PERMISSIONS ---//

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmdName = args.shift().toLowerCase();

  const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

  if (cmdName.length == 0) return;
  if (!cmd) return message.reply(`\`${cmdName}\` não é um comando válido.`);

  if (message.channel.type != 'dm') {

    if (cmd.userPermissions && !message.member.permissions.has(cmd.userPermissions))
      return embeds.userPermission(client, message, cmd);

    let clientMember = await message.guild.members.fetch(client.user);
    if (cmd.botPermissions && !clientMember.permissions.has(cmd.botPermissions))
      return embeds.botPermission(client, message, cmd);

    if (cmd.nsfw && !message.channel.nsfw)
      return message.channel.send(embeds.nsfw);

    if (cmd.inVoiceChannel && !message.member.voice.channel)
      return message.channel.send(embeds.inVoiceChannel);

  }

  if (message.channel.type == 'dm' && !cmd.dmAllow) return;

  //---- EXCECUTAR COMANDO ----//

  try {
    cmd.execute(client, message, args);
  } catch (err) {
    message.reply(`houve um erro ao executar esse comando`);
    console.log(err);
  }

});

client.on("guildCreate", async (guild) => {
  try {
    require('./events/guildCreate').guildCreate(guild);
  } catch (erro) {
    console.log(erro);
  }
})

client.on("voiceStateUpdate", function(oldMember, newMember) {

  var newChannel = newMember.channel;

});

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function loop(client) {
    while (true) {

      require('./voicexp').voiceXpAdd(client);

      await delay(1000 * 60 * 5);
    }
  }


loop(client)


client.login(process.env.token_bot);