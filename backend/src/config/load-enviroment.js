import * as dotenv from 'dotenv';

dotenv.config();

const loadEnvironment = (key) => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error('환경변수가 설정되지 않음');
  }

  return value;
};

export default loadEnvironment;
