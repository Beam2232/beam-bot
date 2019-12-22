const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  message.reply(' enviei a lista de comandos no seu chat privado.').then(m => m.delete(8000));
  // Respondendo no servidor que a mensagem foi enviada no PV.

  var delay = 2570; // Adiconando delay
  var embed = new Discord.RichEmbed() // Criando embed no privado
    .setTitle('Clique nas reações abaixo para navegar entre meus comandos.')
    .setDescription('⚙️ Comandos de administração. \n \n 🔰 Comandos públicos para todos.');

    // Adiconando reações no embed
    message.author.send({ embed }).then( msg => {
      msg.react('⚙️').then(setTimeout(r => {
      msg.react('🔰');
      }, delay ));

      // Criando função para as reações
      const adm = (reaction, user) => reaction.emoji.name === '⚙️' && user.id === message.author.id;
      const pub = (reaction, user) => reaction.emoji.name === '🔰' && user.id === message.author.id;
      const admCreate = msg.createReactionCollector(adm, { time: 60000 });
      const pubCreate = msg.createReactionCollector(pub, { time: 60000 });

      // Coletando a reação ⚙️ e respondendo
      admCreate.on('collect', r2 => {
        embed = new Discord.RichEmbed()
          .setTitle('**⚙️ Comandos de administração**')
          .setDescription('`/limpar` Limpa entre 2 e 100 mensagens do canal. \n\n `/falar` Repete uma mensagem.\n\n');
          // Mostrando os comandos ^^
          msg.edit(embed); // Editando embed
      });

      // Coletando a reação 🔰 e respondendo
      pubCreate.on('collect', r2 => {
        embed = new Discord.RichEmbed()
          .setTitle('**🔰 Comandos públicos para todos**')
          .setDescription('`/ajuda` Mostra meus comandos\n\n`/ping` Mostra meu ping');
          // Mostrando os comandos públicos ^^
          msg.edit(embed); // Editando embed
      });
    });

    message.delete(8000).catch(O_o => {}); // Apaga mensagem do usuário depois de 8s.
};
