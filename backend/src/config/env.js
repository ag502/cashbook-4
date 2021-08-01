import loadEnvironment from './load-enviroment.js';

const env = {
  PORT: loadEnvironment('PORT'),
  JWT_SECRET: loadEnvironment('JWT_SECRET'),
  API_PREFIX: loadEnvironment('API_PREFIX'),
};

export default env;
