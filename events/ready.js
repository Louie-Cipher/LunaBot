module.exports = {

	name: 'ready',
	once: true,

	async execute(client) {
		
  console.log('Carregando');

  client.commands.forEach(cmd => {
		  console.log(` | ${cmd.name} | OK |`);
	  });
    console.log(`|| ${client.user.tag} online! ||`);

  let activities = [
    `Utilize l.help para ver uma lista com todos os meus comandos`,
    `Olá, eu sou a Luna. um bot experimental criado pela Louie.`,
    `${client.channels.cache.size} canais.`,
    `${client.users.cache.size} usuários.`
  ],
  i = 0;
  setInterval( () =>
    client.user.setActivity(`${activities[i++ % activities.length]}`, {type: 'PLAYING'}),
    1000 * 10 );

	},
};