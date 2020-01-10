const Discord = require('discord.js')

exports.execute = async (message) => {
  const errorMessageAdm = new Discord.RichEmbed()
    .setTitle(`O comando \`\`${message.content}\`\` está retornando um erro.`)
    .setTimestamp()
    .setColor('#a10303')
    .setThumbnail('')
    .setDescription(`Chame algum administrador ou contate alguém da Staff do Bot.`)

  return message.author.send(errorMessageAdm).then(msg => msg.delete(5000));
};

