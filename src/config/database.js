require('dotenv').config();

const config = {
  default: {
    database: process.env.DB_NAME || 'brokerdb',
    dialect: process.env.DB_DIALECT || 'postgres',
    host: 'db',
    password: process.env.DB_PASSWORD || 'mypassword',
    username: process.env.DB_USERNAME || 'myuser',
  },
};

Object.keys(config).forEach((configKey) => {
  //
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = { ...config[configValue.extend], ...configValue };
  }
});

module.exports = config;
