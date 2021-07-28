const Discord = require('discord.js');
const DisTube = require('distube');

module.exports = {

  async events(distubeClient) {

    distubeClient

      .on('playSong', async (message, queue, song) => {

        let embed = new Discord.MessageEmbed()
          .setColor('#3eb5b5')
          .addFields({ name: "Reproduzindo:", value: `${song.name} || \`${song.formattedDuration}\`` },
            { name: 'Enviado por:', value: song.user })
          .setThumbnail(song.thumbnail);

        message.channel.send(embed);

      })

      .on('addSong', async (message, queue, song) => {

        let embed = new Discord.MessageEmbed()
          .setColor('#009999')
          .addFields({ name: "Adcionado a lista de reprodução:", value: `${song.name} || \`${song.formattedDuration}\`` },
            { name: 'Enviado por:', value: song.user })
          .setThumbnail(song.thumbnail);

        message.channel.send(embed);

      })

      .on("playList", (message, queue, playlist, song) => {

        let embed = new Discord.MessageEmbed()
          .setColor('#009999')
          .setTitle('Playlist adcionada. Iniciando a reprodução');

        playlist.songs.forEach(songList => {
          embed.addField({ name: `${songList.name}`, value: `` })
        })

        message.channel.send(embed);

      })

      .on("addList", (message, queue, playlist) => {

        let embed = new Discord.MessageEmbed()
          .setColor('#009999')
          .setTitle('Playlist adcionada a fila de reprodução:');

        playlist.songs.forEach(songList => {
          embed.addField({ name: `${songList.name}`, value: `` })
        })

        message.channel.send(embed);

      })

      .on('error', (message, e) => {
        console.error(e)
        message.channel.send(`Houve um erro a executar essa ação: \n${e}`)
      });

  }

}