const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()
  .setTitle("This is your title, it can hold 256 characters")
  .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
  .setImage("http://i.imgur.com/yVpymuV.png")
  .setThumbnail("http://i.imgur.com/p2qNFag.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/v12/class/MessageEmbed")
  .addFields({ name: "This is a field title, it can hold 256 characters",
      value: "This is a field value, it can hold 1024 characters."})
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addFields({ name: "Inline Field", value: "They can also be inline.", inline: true })
  /*
   * Blank field, useful to create some space.
   */
  .addFields({ name: '\u200b', value: '\u200b' })
  .addFields({ name: "Inline Field 3", value: "You can have a maximum of 25 fields.", inline: true});

  /*
  a cor da embed. pode ser:
DEFAULT
WHITE
AQUA
GREEN
BLUE
YELLOW
PURPLE
LUMINOUS_VIVID_PINK
GOLD
ORANGE
RED
GREY
DARKER_GREY
NAVY
DARK_AQUA
DARK_GREEN
DARK_BLUE
DARK_PURPLE
DARK_VIVID_PINK
DARK_GOLD
DARK_ORANGE
DARK_RED
DARK_GREY
LIGHT_GREY
DARK_NAVY
BLURPLE
GREYPLE
DARK_BUT_NOT_BLACK
NOT_QUITE_BLACK
RANDOM
*/

const exampleEmbed = {
	color: 0x0099ff,
	title: 'Some title',
	url: 'https://discord.js.org',
	author: {
		name: 'Some name',
		icon_url: 'https://i.imgur.com/wSTFkRM.png',
		url: 'https://discord.js.org',
	},
	description: 'Some description here',
	thumbnail: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},
	fields: [
		{
			name: 'Regular field title',
			value: 'Some value here',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
	],
	image: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},
	timestamp: new Date(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'https://i.imgur.com/wSTFkRM.png',
	},
};

channel.send({ embed: exampleEmbed });