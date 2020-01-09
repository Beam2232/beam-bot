const Discord = require('discord.js')

//erro nas permissões das mensagens

exports.execute = async (message) => {

    const noPerm = new Discord.RichEmbed()
        .setColor('#a32aff')
        .setTimestamp()
        .setDescription('Você não tem permissão para executar este comando.')

    return message.reply(noPerm).then(m =>
        m.delete(5000));

}

