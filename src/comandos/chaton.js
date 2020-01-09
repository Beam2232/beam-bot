exports.run = async (client, message, args) => {
  const author = message.author;

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    message.reply('você ganhar um mute?');
    author.mute;
  };

  const todosMembros = message.guild.roles.find('name','@everyone');
  const administrador = message.guild.roles.find('name', 'Bot');

  message.channel.overwritePermissions(todosMembros, {
    SEND_MESSAGES: true
  });

  message.channel.overwritePermissions(administrador, {
    SEND_MESSAGES: true
  });

  message.channel.send(`✅ | O canal ${message.channel} foi **ativado** por ${author}`);
  message.delete().catch(O_o => {});
};


exports.help = {
  name: 'chaton'
};