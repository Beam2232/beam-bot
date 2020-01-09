const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  message.reply(' enviei a lista de comandos no seu chat privado.').then(m => m.delete(8000));

  const delay = 2570;
  var embed = new Discord.RichEmbed()
    .setTitle('Clique nas reações abaixo para navegar entre meus comandos.')
    .setDescription('⚙️ Comandos de administração. \n \n 🔰 Comandos públicos para todos.');

    message.author.send({ embed }).then( msg => {
      msg.react('⚙️').then(setTimeout(r => {
      msg.react('🔰');
      }, delay ));

      const adm = (reaction, user) => reaction.emoji.name === '⚙️' && user.id === message.author.id;
      const pub = (reaction, user) => reaction.emoji.name === '🔰' && user.id === message.author.id;
      const admCreate = msg.createReactionCollector(adm, { time: 60000 });
      const pubCreate = msg.createReactionCollector(pub, { time: 60000 });

      admCreate.on('collect', r2 => {
        embed = new Discord.RichEmbed()
          .setTitle('**⚙️ Comandos de administração**')
          .setDescription(['`.limpar` Limpa entre 2 e 100 mensagens do canal. \n',
            '`.falar` Repete uma mensagem. \n',
            '`.ban` Bane algum membro infrator. \n',
            '`.anunciar` Anuncia alguma mensagem importante. \n',
            '`.votar` Inicia uma votação. \n',
            '`.chaton` Ativa um canal. \n',
            '`.chatoff` Desativa um canal. \n']);
          msg.edit(embed);
      });

      pubCreate.on('collect', r2 => {
        embed = new Discord.RichEmbed()
          .setTitle('**🔰 Comandos públicos para todos**')
          .setDescription(['`.ajuda` Mostra meus comandos. \n',
          '`.ping` Mostra meu ping. \n',
          '`.botinfo` Mostra as informações do bot. \n']);
          msg.edit(embed);
      });
    });

    message.delete(8000).catch(O_o => {});
};

exports.help = {
  name: 'ajuda'
};
