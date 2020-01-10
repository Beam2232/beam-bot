exports.run = () => {
  const Discord = require('discord.js');
  const config = require('./config.json');
  const RunMongo = require('./mongodb.js');
  const runModels = require('./RunModels');
  const chalk = require('chalk');

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
    runModels.run();
  });

  client.on('guildCreate', async (guild) => {
    console.log(`> O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros`);
  });

  client.on('guildDelete', async (guild) => {
    console.log(`> O bot foi removido do servidor: ${guild.name}.`);
  });

  client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(`<@655573308670214144>`)) { //< ID do bot.
      message.channel.send('Para saber minha lista de comandos, digite: \`\`.ajuda\`\`')
    };
  });

  client.on('message', async (message) => {
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
