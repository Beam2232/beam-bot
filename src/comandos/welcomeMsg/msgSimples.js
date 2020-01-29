const Discord = require('discord.js');
const msgSimple = require('../../models/welcomeMsgSchema');

exports.run = async (guild, message, args, bot) => {
  const guildName = message.guild.name
  const guildId = message.guild.id
  const delay = 10000;
  const serverName = '${serverName}';
  const playerName = '${playerName}';

  message.channel.send([
    'Qual é a mensagem que deseja que apareça quando o membro entrar no servidor?',
    `Prefixos: \`\`${serverName}\`\` (nome do Servidor).`,
    `\`\`${playerName}\`\` (nome do Player).`
  ])
  .then(m => {
    m.delete(60000);
    message.channel.awaitMessages(response => response.content,
      { max: 1, time: 60000, maxMatches: 1, errors: ['time'] })
    .then((collected) => {
      const msgCollected = collected.first().content;
      collected.first().delete(50000);
      message.channel.send(`Você escolheu a seguinte mensagem: ${msgCollected}`).then(msg => {
        msg.react('✅');
        msg.react('❌');

        const yes = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const no = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
        const yesCreate = msg.createReactionCollector(yes, { time: 60000 });
        const noCreate = msg.createReactionCollector(no, { time: 60000 });

        yesCreate.on('collect', r2 => {
          const messageSaved = new msgSimple({
            enter_message: msgCollected,
            guild_id: guildId,
            guild_name: guildName
          });

          messageSaved.save()
          .catch(err => {
            console.error(err)
          });

          msg.edit('Sua mensagem foi registrada.');
          msg.clearReactions();
          msg.delete(50000);
        });

        noCreate.on('collect', r2 => {
          msg.clearReactions();
          return msg.edit('Comando cancelado, tente novamente.').then(m => m.delete(delay));
        });
      })
    })
    .catch(collected => {
      message.channel.send(`Parece que você não conseguiu responder, tente novamente.`)
      .then(m => m.delete(50000));
    });
  });
};
