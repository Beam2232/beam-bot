const Discord = require('discord.js');

const noPerm = require('./../../utils/noPerm')

exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return noPerm.execute(message)
  }


  if (!args[0]) {

    const noArgs = new Discord.RichEmbed()

      .setDescription("**Comando:** /anunciar")
      .setColor("#a32aff")
      .setImage("")
      .setThumbnail("")
      .addField("Uso:", "\`\`/anunciar <mensagem>\`\`")
      .addField("Exemplo:", "\`\`/anuncio Eu sou um Bot`\`")

    return message.channel.send(noArgs)
  };

  let volte = args[0];
  if (!volte) return;

  let say = args.join(' ');

  const embed = new Discord.RichEmbed()
    .setAuthor('Aviso', 'https://media.discordapp.net/attachments/509052537177899014/510877389023346718/416793772672679939.gif')
    .setFooter(`Anunciado por: ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#a32aff')
    .setThumbnail('')
    .setDescription(`ㅤㅤ${say}ㅤㅤ`);

  message.delete().catch(O_o => { });
  message.channel.send('@everyone', embed)
};

exports.help = {
  name: 'anunciar'
};
