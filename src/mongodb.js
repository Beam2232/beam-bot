const mongoose = require('mongoose');
const config = require('./config.json');

exports.run = function Database() {
  mongoose.connect(config.mongoConnect, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})
    .then(() => console.log('> MongoDb Conectado.'))
    .catch(err => console.log(err))
};
