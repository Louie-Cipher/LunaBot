const Discord = require('discord.js');
const DisTube = require('distube');
const disbutton = require('discord-buttons');
const fs = require('fs');
require('dotenv').config();

var prefix = "'";

const client = new Discord.Client({ partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION'] });
disbutton(client);
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: true });

require('./mongoose').init();

require('./distubeEvents').events(client.distube);

client.commands = new Discord.Collection();

const mainFolderCommands = fs.readdirSync('./commands');

for (const subFolder of mainFolderCommands) {

  let categoryFolder = fs.readdirSync(`./commands/${subFolder}`);

  for (const file of categoryFolder) {
    let cmd = require(`./commands/${subFolder}/${file}`);
    client.commands.set(cmd.name, cmd);
  }

}

/*client.events = new Discord.Collection();

const eventsFolder =  fs.readdirSync('./events').filter(file => file.endsWith('.js'));

eventsFolder.forEach(file => {

  let event = require(`./events/${file}`);
 
  client.events.set(event.name, event)

});*/

client.on('ready', async () => {

  require('./events/ready').eventTrigger(client);

});

client.on('message', async message => {

  require('./events/message').eventTrigger(client, message);

});

/*client.on("voiceStateUpdate", function(oldMember, newMember) {

  var newChannel = newMember.channel;

});*/

/*function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function voiceXPloop(client) {
  while (true) {

    await delay(1000 * 15);

    require('./voicexp').voiceXpAdd(client);
    
  }
}

voiceXPloop(client);*/

client.login(process.env.token_bot);