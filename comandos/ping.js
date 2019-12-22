module.exports.run = async (bot, message) => {
  const Ping = Math.round(bot.ping);

  await message.channel.send({
    embed: {
      description: `Ping: ${Ping}ms ✅`,
      color: 5652869,
    },
  });
};

module.exports.config = {
  command: 'ping',
};
