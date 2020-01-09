const Discord = require('discord.js');
const config = require('./config.json');
const RunMongo = require('./mongodb.js');
const runModels = require('./RunModels');

const client = new Discord.Client({
  disableEveryone: false,
  autoReconnect: true,
  fetchAllMembers: true
});

const errorMessage = require('../utils/errorMessage')
const runCommand = require('../utils/loadCommands')

client.commands = new Discord.Collection();

runCommand.ALL(client)

// Bot iniciado
client.on('ready', () => {
  console.log('> Bot iniciado.');
  console.log(`> Atualmente com ${client.users.size} usuários, em ${client.channels.size} canais.`);
  RunMongo.run();
  runModels.run();
});

// Bot adicionado a algum servidor
client.on('guildCreate', async (guild) => {
  console.log(`> O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros`);
  client.user.setActivity(`> Estou em ${client.guilds.size} servidores.`);
});

// Bot removido de algum servidor
client.on('guildDelete', async (guild) => {
  console.log(`> O bot foi removido do servidor: ${guild.name}.`);
});

client.on('message', async (message) => {

  if (message.author.bot) return;
  // Bot mencionado (Caso for trocar o bot mudar o id aqui embaixo)
  if (message.content.startsWith(`<@655573308670214144>`)) { //< ID
    message.channel.send('Para saber minha lista de comandos, digite: \`\`.ajuda\`\`')
    // "\`\`/ajuda\`\`" deixa a mensagem com um preto atrás.
  }
});

// Reconhecendo comandos
client.on('message', async (message) => {

  if (message.author.bot) return; // Caso outro bot escreva, será ignorado

  if (message.channel.type === 'dm') return; // Evitando receber por DM

  let prefix = config.prefix

  if (!message.content.startsWith(prefix)) return; // Verificando se a mensagem inicia com o prefix

  let messageArray = message.content.split(" ");

  let cmd = messageArray[0]; // Pegando o comando

  let args = messageArray.slice(1); // Pegando o comando

  try {

    // A lista de if / else é substituída pelas 2 linhas simples:

    let arquivocmd = client.commands.get(cmd.slice(prefix.length));

    if (arquivocmd) {
      arquivocmd.run(client, message, args)
    };

    if (arquivocmd == null) {

      errorMessage.execute(message)

    }

  } catch (err) {

    message.delete(5000).catch(O_o => { });

    errorMessage.execute(message)

  }

});

client.login(config.token);
