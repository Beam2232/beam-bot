const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const fs = require('fs');
const os = require('os');
const cpuStat = require('cpu-stat');

module.exports.run = (client, message, args, bot) => {
  let duration = moment.duration(client.uptime).format('D [d], H [h], m [m], s [s]');
  moment.locale('pt-br');

  let file = fs.readdirSync('./comandos'); // Vendo quandos comandos o bot tem
  let commands = file.length;

  cpuStat.usagePercent(function (err, percent, seconds) {
    if (err) {
      return console.log('> Deu erro');
    };
    const embed = new Discord.RichEmbed()
      .setTitle(' Minhas iformações')
      .setDescription(`[MEU CONVITE](https://discordapp.com/oauth2/authorize?=&client_id=655573308670214144&scope=bot&permissions=8)`)
      .setFooter(`${message.author.tag}`, message.author.avatarURL)
      .setColor('#a32aff', true)
      .addField('Meu nome:',` <@655573308670214144> `, true)
      .addField(' | Criador por ', '<@585484808575254539>', true)
      .addField(' | Servidores:', `\n\`${client.guilds.size}\``, true)
      .addField(' | Data de Criação:', `\n\`13/12/2019\``, true)
      .addField(' | Usuários:', `\n\`${client.users.size}\``, true)
      .addField(' | Canais:', `\n\`${client.channels.size}\``, true)
      .addField(' | Último reload:',`\n\`${duration}\``, true)
      .addField(' | Latência:',`\n\`${Math.round(client.ping)}ms\``, true)
      .addField(' | Versão:', '\n\`1.0\`', true)
      .addField(' | Prefixo:', '\n\`.\`', true)
      .addField(' | Total de comandos:', `\n\`${commands}\``, true)
      .addField(' | Uso da CPU', `\n\`${percent.toFixed(2)}%\``, true)
      .addField(' | Sistema:', '\n\`x64\`', true) // Embed da mensagem

    message.channel.send(embed).then(async msg => {
      await msg.react('⛔'); // O bot reagirá com esse emoji

      const deleteFilter = (reaction, user) => reaction.emoji.name === '⛔' && user.id === message.author.id;
      const deleteEmbed = msg.createReactionCollector(deleteFilter);
      // Verificando se a reação foi com ⛔ e verificando se foi o autor do comando.

      deleteEmbed.on('collect', async bot => {
        await msg.delete(); // Deletando o embed caso seja verdade a ultima verificação
      })
    });

    message.delete(5000).catch(O_o => {}); // Apagando a mensagem de chamada do comando

  });
};

module.exports.config = {
  name: "botinfo",
  aliases: ["botinfo"]
};
