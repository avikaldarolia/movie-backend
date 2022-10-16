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
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    jwtKey: process.env.JWT_SECRET,
    googleOAuth: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      uri: process.env.GOOGLE_OAUTH_URI,
      token: process.env.GOOGLE_OAUTH_TOKEN,
      secret: process.env.GOOGLE_OAUTH_SECRET,
    },
    aws: {
      s3_bucket: process.env.AWS_S3_BUCKET,
      access_key_id: process.env.AWS_ACCESS_KEY_ID,
      secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      cloud_front_url: process.env.AWS_CLOUD_FRONT_URL,
    },
  },
};
