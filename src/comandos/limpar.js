const Discord = require('discord.js');

const noPerm = require('./../../utils/noPerm')

exports.run = async (client, message, args) => {

  // Verificando se tem permissão
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    noPerm.execute(message)
  };

  // Verificando quantidade de mensagens à apagar
  const quantidadeDeletada = parseInt(args[0], 10);
  if (!quantidadeDeletada || quantidadeDeletada < 2 || quantidadeDeletada > 100) {

    const errorQuantity = new Discord.RichEmbed()
      .setColor('#a32aff')
      .setTimestamp()
      .setDescription(' Por favor, forneça um número entre 2 e 100 para o número de menssagens a serem excluídas!')

    return message.reply(errorQuantity).then(m => m.delete(8000))
  }

  // Buscando mensagem
  const buscando = await message.channel.fetchMessages({ limit: quantidadeDeletada });
  // Apagando mensagem
  message.channel.bulkDelete(buscando)
    // Retornando um erro para mensagens com mais de 14 dias
    .catch(error => {

      const errorDelete = new Discord.RichEmbed()
        .setColor('#a32aff')
        .setTimestamp()
        .setDescription(` Não foi possível deletar mensagens devido a: **Terem mais de 14 dias**`)

      message.reply(errorDelete).then(m => m.delete(8000))
    })

  const messagesDeleted = new Discord.RichEmbed()
    .setTimestamp()
    .setColor('#a32aff')
    .setThumbnail('')
    .setDescription(`As menssagens foram apagadas!\n Por: ${message.author} \nQuantidade: **${args[0]}**`)

  // Retornando para o usuário quantas mensagens foram apagadas.
  return message.channel.send(messagesDeleted).then(m => m.delete(10000))
};

exports.help = {
  name: 'limpar'
};
