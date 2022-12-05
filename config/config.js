require('dotenv').config();

module.exports = {
  local: {
    dialect: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    logging: process.env.DB_LOGGING == 1 ? console.log : null,
  },
  development: {
    dialect: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    logging: process.env.DB_LOGGING == 1 ? console.log : null,
  },
  production: {
    dialect: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    logging: process.env.DB_LOGGING == 1 ? console.log : null,
  },
  parameters: {
    present_otp: process.env.PRESET_OTP,
    server_env: process.env.NODE_ENV,
    jwtKey: process.env.JWT_SECRET,
    salt: process.env.SALT_ROUNDS
  },
};
