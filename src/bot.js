exports.run = () => {
  const Discord = require('discord.js');
  const chalk = require('chalk');
  const config = require('./config.json');
  const RunMongo = require('./mongodb.js');
  const msgSimple = require('./models/welcomeMsgSchema');

  const client = new Discord.Client({
    disableEveryone: false,
    autoReconnect: true,
    fetchAllMembers: true
  });

  const errorMessage = require('../utils/errorMessage');
  const errorMessageAdm = require('../utils/erroMessageAdm');
  const runCommand = require('../utils/loadCommands');
  client.commands = new Discord.Collection();
  runCommand.ALL(client);

  client.on('ready', () => {
    console.log(chalk.blue('> Bot iniciado.'));
    console.log(chalk.blue(`> Atualmente com ${client.users.size} usuários, em ${client.channels.size} canais.`));
    RunMongo.run();
  });

  client.on('guildCreate', async guild => {
    console.log(`> O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros`);
  });

  client.on('guildDelete', async guild => {
    console.log(`> O bot foi removido do servidor: ${guild.name}.`);
  });

  client.on('guildMemberAdd', async member => {
    const guildId = member.guild.id;
    const guildName = member.guild.name;

    const serverOn = await msgSimple.findOne({ guild_id: guildId });
    const canal = client.channels.get('656842963992707085');
    const playerName = serverOn.enter_message.includes('${playerName}');
    const serverName = serverOn.enter_message.includes('${serverName}');
    const memberEnter = `<@${member.user.id}>`;

    if (serverOn) {
      if (playerName) {
        const enterMessage1 = serverOn.enter_message.replace('${playerName}', memberEnter);

        if (serverName) {
          const enterMessage2 = enterMessage1.replace('${serverName}', guildName);
          canal.send(enterMessage2);
        }
        else {
          canal.send(enterMessage1);
        };
      }
      else {
        const enterMessage = serverOn.enter_message;
        canal.send(enterMessage);
      };
    };
  });

  client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(`<@655573308670214144>`)) { //< ID do bot.
      message.channel.send('Para saber minha lista de comandos, digite: \`\`.ajuda\`\`')
    };
  });

  client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    try {
      let arquivoCmd = client.commands.get(cmd.slice(prefix.length));
      if (arquivoCmd) {
        arquivoCmd.run(client, message, args);
      };
      if (arquivoCmd == null) {
        errorMessage.execute(message);
      };

    } catch (err) {
      message.delete(5000).catch(O_o => { });
      await errorMessageAdm.execute(message);
      console.log(err);
    };
  });

  client.login(config.token);

};
