const mongoose = require('mongoose');
require('dotenv').config()
const mongodb_login = process.env.mongodb_login;

module.exports = {

  init: () => {

  mongoose.connect(mongodb_login, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })


  /*mongoose.set('useFindAndModify', false);
  mongoose.Promisse = global.Promisse;*/

  mongoose.connection.on('connected', () => {
    console.log('\x1b[4m%s\x1b[0m', '| Conectado ao 🏧 de 🎲 | ');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('❌ 🎲 | Desconectado do banco de dados | ❌ 🎲 ');
  });

  mongoose.connection.on('err', (err) => {
    console.log('❌ 🎲 Erro ao conectar ao banco de dados: ' + err);
  });

  }

}