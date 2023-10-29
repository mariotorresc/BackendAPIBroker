require('dotenv').config();

const config = {
  default: {
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
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
