const msgSimple = require('./models/welcomeMsgSchema');
const welcomeMsg = require('./comandos/welcomeMsg');

exports.run = () => {
  const msg = new msgSimple({
    message: welcomeMsg.msgCollected,
    guild_id: welcomeMsg.guildId,
    guild_name: welcomeMsg.guildName
  });

  msg.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
};
