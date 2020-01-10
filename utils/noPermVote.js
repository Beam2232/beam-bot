const Discord = require('discord.js')

exports.execute = async (message) => {
  const noPermVote = new Discord.RichEmbed()
    .setColor('#a10303')
    .setTimestamp()
    .setDescription('Você não tem permissão para iniciar uma votação.');

  return message.reply(noPermVote).then(m => m.delete(5000));
};

