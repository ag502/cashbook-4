import loadEnvironment from './load-enviroment.js';

const dbconfig = {
  DB_NAME: loadEnvironment('DB_NAME'),
  DB_USER: loadEnvironment('DB_USER'),
  DB_PASSWORD: loadEnvironment('DB_PASSWORD'),
  DB_HOST: loadEnvironment('DB_HOST'),
  DB_PORT: loadEnvironment('DB_PORT'),
};

export default dbconfig;
