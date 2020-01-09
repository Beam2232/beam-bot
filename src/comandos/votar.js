const Discord = require('discord.js');

const noPermVote = require('./../../utils/noPermVote')

exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return noPermVote.execute(message)
  }

  const msg = args[0]

  if (!msg) {
    message.delete().catch(O_o => { });

    const sendVote = new Discord.RichEmbed()
    .setDescription('**Comando:** .votar')
    .setColor('#5e29ff')
    .setImage('')
    .setThumbnail('')
    .addField('Uso:', '\`\`.votar\`\`')
    .addField('Exemplo:', '\`\`.votar Vocês querem evento?`\`')

    return message.channel.send(vote).then(m =>
        m.delete(delay))
  };

  const mensagem = args.join(' ');

  const embed = new Discord.RichEmbed()
    .setAuthor('Votação', 'https://media.discordapp.net/attachments/509052537177899014/510877389023346718/416793772672679939.gif')
    .setTitle(`ㅤㅤ${mensagem}ㅤㅤ`)
    .setDescription('Reaja com ✅ para Sim ou ❌ para não.')
    .setTimestamp()
    .setColor('#5e29ff')
    .setThumbnail('')
    .setFooter(`Iniciada por: ${message.author.tag}`, message.author.avatarURL);

  message.channel.send('@everyone.', embed).then(m => {
    m.react('✅');
    m.react('❌');
  });
  message.delete().catch(O_o => { });

};

exports.help = {
  name: 'votar'
};
