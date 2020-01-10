const Discord = require('discord.js');

exports.execute = async (message) => {
  const errorMessage = new Discord.RichEmbed()
    .setTitle(`O comando \`\`${message.content}\`\` não existe`)
    .setTimestamp()
    .setColor('#a10303')
    .setThumbnail('')
    .setDescription(`Digite .ajuda e descubra os meus comandos.`)

  return message.channel.send(errorMessage).then(msg => msg.delete(5000));
}

