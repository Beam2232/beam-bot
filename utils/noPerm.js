const Discord = require('discord.js');

exports.execute = async (message) => {
  const noPerm = new Discord.RichEmbed()
    .setColor('#a10303')
    .setTimestamp()
    .setDescription('Você não tem permissão para executar este comando.');

  return message.reply(noPerm).then(m =>
    m.delete(5000));
};

