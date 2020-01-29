const mongoose = require('mongoose');

const msgSimple = new mongoose.Schema({
  enter_message: String,
  guild_id: Number,
  guild_name: String,
  channel_emit: Number,
});

module.exports = mongoose.model('MsgSimple', msgSimple);
