const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  // Verificando se tem permissão
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(new Discord.RichEmbed()
    .setColor('#a32aff')
    .setTimestamp()
    .setDescription(' Você não tem permissão para executar este comando.')).then(m => m.delete(5000000));

    // Verificando quantidade de mensagens à apagar
    const quantidadeDeletada = parseInt(args[0], 10);
    if(!quantidadeDeletada || quantidadeDeletada < 2 || quantidadeDeletada > 100)
    return message.reply(new Discord.RichEmbed()
      .setColor('#a32aff')
      .setTimestamp()
      .setDescription(' Por favor, forneça um número entre 2 e 100 para o número de menssagens a serem excluídas!')).then(m => m.delete(8000))

    // Buscando mensagem
    const buscando = await message.channel.fetchMessages({limit: quantidadeDeletada});
    // Apagando mensagem
    message.channel.bulkDelete(buscando)
    // Retornando um erro para mensagens com mais de 14 dias
      .catch(error => message.reply(new Discord.RichEmbed()
      .setColor('#a32aff')
      .setTimestamp()
      .setDescription(` Não foi possível deletar mensagens devido a: **Terem mais de 14 dias**`))).then(m => m.delete(8000))

    // Retornando para o usuário quantas mensagens foram apagadas.
    return message.channel.send(new Discord.RichEmbed()
      .setTimestamp()
      .setColor('#a32aff')
      .setThumbnail('')
      .setDescription(`As menssagens foram apagadas!\n Por: ${message.author} \nQuantidade: **${args[0]}**`)).then(m => m.delete(10000))
};
