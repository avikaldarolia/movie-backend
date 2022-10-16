const Sequelize = require('sequelize');
const config = require('./config/config').local;
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('connection established');
  })
  .catch((err) => console.log(err));

module.exports = sequelize;
