import * as dotenv from 'dotenv';

dotenv.config();

const loadEnvironment = (key) => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error('환경변수가 설정되지 않음');
  }

  return value;
};

const env = {
  PORT: loadEnvironment('PORT'),
  JWT_SECRET: loadEnvironment('JWT_SECRET'),
  API_PREFIX: loadEnvironment('API_PREFIX'),
};

export default env;
