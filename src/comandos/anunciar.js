const Discord = require('discord.js');

exports.run = (client, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply(new Discord.RichEmbed()
      .setColor('#a32aff')
      .setTimestamp()
      .setDescription('Você não tem permissão para executar este comando.')).then(m =>
        m.delete(5000));

  if (!args[0]){
    message.channel.send(new Discord.RichEmbed()
      .setDescription("**Comando:** /anunciar")
      .setColor("#a32aff")
      .setImage("")
      .setThumbnail("")
      .addField("Uso:", "\`\`/anunciar <mensagem>\`\`")
      .addField("Exemplo:", "\`\`/anuncio Eu sou um Bot`\`"))};

  let volte = args[0];
  if (!volte) return;

  let say = args.join(' ');

  const embed = new Discord.RichEmbed()
    .setAuthor('Aviso','https://media.discordapp.net/attachments/509052537177899014/510877389023346718/416793772672679939.gif')
    .setFooter(`Anunciado por: ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setColor('#a32aff')
    .setThumbnail('')
    .setDescription(`ㅤㅤ${say}ㅤㅤ`);

  message.delete().catch(O_o => {});
  message.channel.send('@everyone', embed)
};
