const Discord = require('discord.js');
const noPerm = require('../../utils/noPerm');
const msgSimple = require('../models/welcomeMsgSchema');
const msgSimpleJS = require('./welcomeMsg/msgSimples');

exports.run = async (guild, message, args, bot) => {
  const guildId = message.guild.id
  const argsEmbed = 'embed';
  const argsMsg = 'msg';
  const delay = 10000;

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return noPerm.execute(message);
  };

  const serverOn = await msgSimple.findOne({ guild_id: guildId })

  if (!serverOn) {
    if (!args[0] || args[0] != argsEmbed && args[0] != argsMsg) {
      message.channel.send(new Discord.RichEmbed()
        .setTitle('**Comando:** .welcomeMsg')
        .setColor('#28fce4')
        .setImage('')
        .setThumbnail('')
        .addField('Uso:', '\`\`.welcomeMsg (padrão desejado)\`\`')
        .addField('Exemplo:', '\`\`.welcomeMsg embed`\`')
        .setDescription('Atualmente temos dois padrões: Embed e Mensagem Simples.'))
      .then(m => m.delete(delay));
    };

    if (args[0] === argsEmbed) {
      return message.reply('por enquanto esse comando está desativado.');
      /* message.channel.send(new Discord.RichEmbed()
        .setTitle()
        .setColor()
        .setImage('')
        .setThumbnail('')
        .addField()
        .setDescription('')
        .setFooter("©BeamBot - Todos os direitos reservados", message.author.avatarURL))
      */
      /*
        setTittle = nickdoplayer que entro
        setDescription = escolhido pelo adm
        setFooter("©BeamBot - Todos os direitos reservados", message.author.avatarURL)
        setThumbnail = avatar de quem entrou (member.user.avatarURL)
        addField = escolhido pelo adm
      */
    }
    else if (args[0] === argsMsg) {
      msgSimpleJS.run(guild, message, args, bot);
    };
  }
  else {
    const trueMessage = new Discord.RichEmbed()
      .setTitle('O seu servidor já possui uma mensagem.')
      .setColor('#28fce4')
      .setDescription(`Sua mensagem é: \`${serverOn.enter_message}\``);

    await message.channel.send(trueMessage)
      .then(m => m.delete(delay));
  };

  message.delete(8000).catch(O_o => {});
};

exports.help = {
  name: 'welcomeMsg'
}
