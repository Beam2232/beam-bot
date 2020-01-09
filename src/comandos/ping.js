const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  message.delete()

  const Ping = Math.round(bot.ping);

  const embed = new Discord.RichEmbed()
  .setDescription(`Ping: ${Ping}ms`)
  .setColor(5652869)

  await message.channel.send(embed)

};

exports.help = {
  name: 'ping'
};