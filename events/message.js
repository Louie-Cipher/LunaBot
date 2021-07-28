const embeds = require('../embeds.js');
const profileModel = require('../mongoSchema/profile');
const guildModel = require('../mongoSchema/guild');

module.exports = {

    name: 'message',

    async eventTrigger(client, message) {

        if (message.author.bot) return;

        if (message.guild) {

            if (!message.guild.available) return;

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

            var prefix = "'";

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

         //---- VERIFICAÇÃO COMANDO E PERMISSIONS ----//

            let clientMember = await message.guild.members.fetch(client.user);

            let msgContent = message.content.toLowerCase();

            if (!message.channel.permissionsFor(clientMember).has('SEND_MESSAGES')) return;

            if ( (msgContent == `<@${client.user.id}>` || msgContent == `<@!${client.user.id}>`) && message.mentions.users.first() == client.user) {
                try {
                    embeds.lunaHello(message, prefix)
                } catch (erro) {
                    console.log(erro);
                }
            }

        }

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        let cmdName = args.shift().toLowerCase();

        if (cmdName.length == 0) {
            cmdName = args[0];
            let emptyCmdName = args.shift();
        }

        const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

        if (!cmd) return message.reply(`\`${cmdName}\` não é um comando válido.`);

        if (message.guild) {

            if (cmd.userPermissions && !message.member.permissions.has(cmd.userPermissions))
                return embeds.userPermission(client, message, cmd);

            let clientMember = await message.guild.members.fetch(client.user);
            if (cmd.botPermissions && !clientMember.permissions.has(cmd.botPermissions))
                return embeds.botPermission(message, cmd);

            if (cmd.nsfw && !message.channel.nsfw)
                return message.channel.send(embeds.nsfw);

            if (cmd.inVoiceChannel && !message.member.voice.channel)
                return message.channel.send(embeds.inVoiceChannel);
            if(clientMember.voice.channel) {
                if (cmd.inVoiceChannel && message.member.voice.channel.id != clientMember.voice.channel.id)
                    return;
            }

        }

        if (message.channel.type == 'dm' && !cmd.dmAllow) return;

        //---- EXCECUTAR COMANDO ----//

        try {
            cmd.execute(client, message, args);
        } catch (err) {
            message.reply(`houve um erro ao executar esse comando`);
            console.log(err);
        }

    }
}