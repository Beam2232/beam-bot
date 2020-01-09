const Discord = require('discord.js')

//erro nas permissões das mensagens no comando votar

exports.execute = async (message) => {

    const noPermVote = new Discord.RichEmbed()
        .setColor('#a32aff')
        .setTimestamp()
        .setDescription('Você não tem permissão para iniciar uma votação.')

    return message.reply(noPermVote).then(m =>
        m.delete(5000));
}

