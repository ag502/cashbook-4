import loadEnvironment from './load-enviroment.js';

const env = {
  PORT: loadEnvironment('PORT'),
  JWT_SECRET: loadEnvironment('JWT_SECRET'),
  API_PREFIX: loadEnvironment('API_PREFIX'),
  OAUTH_GITHUB_CLIENT_ID: loadEnvironment('OAUTH_GITHUB_CLIENT_ID'),
  OAUTH_GITHUB_CLIENT_REDIRECT_URI: loadEnvironment(
    'OAUTH_GITHUB_CLIENT_REDIRECT_URI'
  ),
  OAUTH_GITHUB_CLIENT_SECRET: loadEnvironment('OAUTH_GITHUB_CLIENT_SECRET'),
  OAUTH_GITHUB_AUTH_URL: loadEnvironment('OAUTH_GITHUB_AUTH_URL'),
  OAUTH_GITHUB_API_URL: loadEnvironment('OAUTH_GITHUB_API_URL'),
  FRONTEND_HOST: loadEnvironment('FRONTEND_HOST'),
  ACCESS_TOKEN_EXPIRE_TIME: Number(loadEnvironment('ACCESS_TOKEN_EXPIRE_TIME')),
};

export default env;
