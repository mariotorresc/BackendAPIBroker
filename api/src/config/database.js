require('dotenv').config();

const config = {
  default: {
    database: process.env.DB_NAME || 'brokerdb',
    dialect: process.env.DB_DIALECT || 'postgres',
    host: 'db',
    password: process.env.DB_PASSWORD || 'mypassword',
    username: process.env.DB_USERNAME || 'myuser',
  },
  development: {
    database: process.env.DB_NAME || 'iic2513template_dev',
    extend: 'default',
  },
  production: {
    extend: 'default',
    // eslint-disable-next-line camelcase
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    database: 'iic2513template_test',
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
