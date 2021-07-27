const Discord = require('discord.js');
const DisTube = require('distube');

module.exports = {

  async playSong (message, queue, song) {

    let embed = new Discord.MessageEmbed()
      .setColor('#3eb5b5')
      .addFields({name: "Reproduzindo:", value: `${song.name} || \`${song.formattedDuration}\``},
        {name: 'Enviado por:', value: song.user})
      .setThumbnail(song.thumbnail);

    message.channel.send(embed);

    /*message.channel.send({embed: {
      color: 39423,
      fields: [
        {name: "Reproduzindo:", value: `${song.name} || ${song.formattedDuration}`},
        {name: 'Enviado por:', value: song.user}]
    }})
    .then()*/
  },
  
  async addSong (message, queue, song) {
    let embed = new Discord.MessageEmbed()
      .setColor('#009999')
      .addFields({name: "Adcionado a lista de reprodução:", value: `${song.name} || \`${song.formattedDuration}\``},
        {name: 'Enviado por:', value: song.user})
      .setThumbnail(song.thumbnail);

    message.channel.send(embed);

    /*message.channel.send({embed: {
      color: 39423,
      fields: [
        {name: "Adcionado a lista de reprodução:", value: `${song.name} || ${song.formattedDuration}`},
        {name: 'Enviado por:', value: song.user}]
    }})*/
  },

  async addList (message, queue, playlist) {
    let embed = new Discord.MessageEmbed()
      .setColor('#009999')
      .setTitle('Playlist adcionada a fila de reprodução:');

    playlist.songs.forEach(songList => {
      embed.addField({name: `${songList.name}`, value: ``})
    })

    message.channel.send(embed);
  },

  async playList (message, queue, playlist, song) {
    let embed = new Discord.MessageEmbed()
      .setColor('#009999')
      .setTitle('Playlist adcionada a fila de reprodução:');

    playlist.songs.forEach(songList => {
      embed.addField({name: `${songList.name}`, value: ``})
    })

    message.channel.send(embed);
  }

}
