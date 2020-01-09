const Discord = require('discord.js')

//erro no evento mensagem 

exports.execute = async (message) => {

  const errorMessage = new Discord.RichEmbed()
    .setTitle(`O comando \`\`${message.content}\`\` não existe`)
    .setTimestamp()
    .setColor('#a32aff')
    .setThumbnail('')
    .setDescription(`Digite .ajuda e descubra os meus comandos.`)

  return message.channel.send(errorMessage).then(msg => msg.delete(5000));
}

