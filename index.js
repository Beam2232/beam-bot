const Discord = require('discord.js'); // Baixando API do Discord
const client = new Discord.Client(); // Adicionando um bot
const config = require('./config.json'); // Pegando token e prefix

// Bot iniciado
client.on('ready', () => {
  console.log('> Bot iniciado.');
  console.log(`> Atualmente com ${client.users.size} usuários, em ${client.channels.size} canais.`);
});

// Bot adicionado a algum servidor
client.on('guildCreate', (guild) => {
  console.log(`> O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros`);
  client.user.setActivity(`> Estou em ${client.guilds.size} servidores.`);
});

// Bot removido de algum servidor
client.on('guildDelete', (guild) => {
  console.log(`> O bot foi removido do servidor: ${guild.name}.`);
});

client.on('message', (message) => {

  if (message.author.bot) return;
  // Bot mencionado (Caso for trocar o bot mudar o id aqui embaixo)
  if (message.content.startsWith(`<@655573308670214144>`)) { //< ID
    message.channel.send('Para saber minha lista de comandos, digite: \`\`.ajuda\`\`')
  // "\`\`/ajuda\`\`" deixa a mensagem com um preto atrás.
  }});

// Reconhecendo comandos
client.on('message', (message) => {
  if (message.author.bot) return; // Caso outro bot escreva, será ignorado
  if (!message.content.startsWith(config.prefix)) return; // Verificando se a mensagem inicia com o prefix
  if (message.channel.type === 'dm') return; // Evitando receber por DM

  let comando = message.content.split(' ')[0];
  comando = comando.slice(config.prefix.length);

  const args = message.content.split(' ').slice(1); // Pegando o comando
  // A lista de if / else é substituída pelas 2 linhas simples:

  try {
    const comandoFile = require(`./comandos/${comando}.js`);
    comandoFile.run(client, message, args);
  } catch (err) {
    message.delete(5000).catch(O_o => {});
    return message.channel.send(new Discord.RichEmbed()
      .setTitle(`O comando \`\`.${comando}\`\` não existe`)
      .setTimestamp()
      .setColor('#a32aff')
      .setThumbnail('')
      .setDescription(`Digite .ajuda e descubra os meus comandos.`)).then(m =>
        m.delete(5000));
  };
});


client.login(config.token);
