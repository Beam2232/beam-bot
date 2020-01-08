const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const delay = 10000; // Dely de 10s
  message.delete(delay).catch(O_o => {}); // Apagando a mensagem enviada
  if (message.member.hasPermission('BAN_MEMBERS')) { // Verificando permissão
    const member = message.mentions.members.first() // Pegando o player a ser banido
    const author = message.author // Autor da mensagem
    const motivo = args.slice(1).join(' '); // Motivo do ban
    if (!member) { // Caso membro não for mencionado, retornará o erro abaixo
      return message.channel.send(`Você precisa mencionar alguém.`).then(m =>
        m.delete(delay)) // Apaga a mensagem no delay
    }

    if (!member.bannable) { // Caso o cargo for maior que o do bot, retornará a mensagem
      return message.reply(`o membro ${member} possui um cargo maior que o meu. Por isso não cosigo bani-lo.`).then(m =>
        m.delete(delay)) // Apaga a mensagem no delay
    }

    if (!motivo) { // Se o motivo não for colocado, será retornado a mensagem
      return message.reply('você precisa me dizer qual é o motivo do banimento.').then(m =>
        m.delete(delay)) // Apaga a mensagem após o delay
    }

    const banMessage = new Discord.RichEmbed() // Mensagem de ban para o banido
      .setAuthor('Você foi banido!', member.user.avatarURL)
      .setColor("RAMDOM")
      .setThumbnail(member.user.avatarURL)
      .setTimestamp()
      .setFooter("©BeamBot - Todos os direitos reservados", message.author.avatarURL)
      .addField("Motivo:", motivo)
      .addField("Servidor:", message.guild.name)

    await member.user.send(banMessage) // Enviado a mensagem no PV

    await member.ban(`Por: ${author} | Motivo: ${motivo}`) // Banindo
      .catch(error => message.reply(`Não foi possível banir o membro ${member} por ${error}`))
      // Caso não for banido, envia o erro ^

    const banido = new Discord.RichEmbed() // Mensagem de banido para os ADMS
      .setAuthor(member.user.tag + ' | Ban', member.user.avatarURL)
      .setDescription(`${member.user.tag} não cumpriu as regras e foi banido! `)
      .setColor("RAMDOM")
      .setThumbnail(member.user.avatarURL)
      .addField("Motivo:", motivo)
      .addField("Staffer:", message.author)
      .setFooter("©BeamBot - Todos os direitos reservados", message.author.avatarURL)
      .setTimestamp()

    message.channel.send(banido) // Enviado mensagem de ban
  } else {
    return message.reply('Você não possui permissão.') // Caso não o autor não tenha perm
  }
};
