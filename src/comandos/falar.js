const Discord = require('discord.js');
const talkedRecently = new Set();

const noPerm = require('./../../utils/noPerm')

exports.run = async (client, message, args) => {

  const delay = 5000; // Delay de 5s
  // Verificando se tem permissão, caso não tenha será retornado um embed
  if (!message.member.hasPermission('ADMINISTRATOR')){
    return noPerm.execute(message)
  }

  if (talkedRecently.has(message.author.id)) // Verificando se o membro mandou mensagem recente no comando
    return message.channel.send(`${message.author}, aguarde **5 segundos** para executar novamente.`).then(m =>
      m.delete(delay)); // Apagar mensagem em 5s.
    {
    talkedRecently.add(message.author.id);

    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, delay )}; // Fazendo esperar 5 segundos.

    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage);
};

exports.help = {
  name: 'falar'
};
