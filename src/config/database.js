require('dotenv').config();

const config = {
  default: {
    database: 'brokerdb',
    dialect: 'postgres',
    host: 'db',
    password: 'mypassword',
    username: 'myuser',
  },
  development: {
    extend: 'default',
  },
  production: {
    extend: 'default',
  },
  test: {
    extend: 'default',
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
