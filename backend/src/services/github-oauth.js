import sequelize from '../models/index.js';

import { errorTypes } from '../errors/index.js';
import getError from '../utils/error.js';
import request from '../utils/await-request.js';
import env from '../config/env.js';

import qs from 'querystring';

import authTokenService from './auth-token.js';

const { user } = sequelize.models;

class GithubOauthService {
  constructor(userModel) {
    this.userModel = userModel;
    this.authTokenService = authTokenService;
    this.authType = 'github';
  }

  getGithubAuthUrl() {
    const url = `${env.OAUTH_GITHUB_AUTH_URL}/authorize?`;
    const query = qs.stringify({
      client_id: env.OAUTH_GITHUB_CLIENT_ID,
      redirect_uri: env.FRONTEND_HOST + '/',
      scope: 'user:email',
    });

    const githubAuthUrl = url + query;

    return githubAuthUrl;
  }

  async _getGithubOauthAccessToken(code) {
    const BAD_VERIFICATION_CODE = 'bad_verification_code';
    const host = `${env.OAUTH_GITHUB_AUTH_URL}/access_token?`;
    const querystring = qs.stringify({
      client_id: env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: env.OAUTH_GITHUB_CLIENT_SECRET,
      code: code,
    });
    const authUrl = host + querystring;
    const options = {
      uri: authUrl,
      method: 'POST',
      json: true,
    };

    let result;
    try {
      result = await request(options);
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
    if (result.error === BAD_VERIFICATION_CODE) {
      return { success: false, error: getError(errorTypes.LoginFailed) };
    }
    return { success: true, accessToken: result.access_token };
  }

  async getGithubUserInfo(accessToken) {
    const options = {
      uri: env.OAUTH_GITHUB_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: `application/vnd.github.v3+json`,
        'User-Agent': 'cashbook-4',
      },
      json: true,
    };
    try {
      const userInfo = await request(options);
      return userInfo;
    } catch (err) {
      return null;
    }
  }

  async githubLogin({ code }) {
    const accessTokenResult = await this._getGithubOauthAccessToken(code);
    if (!accessTokenResult.success) {
      return accessTokenResult;
    }

    const githubAccessToken = accessTokenResult.accessToken;
    const userInfo = await this.getGithubUserInfo(githubAccessToken);

    if (userInfo === null) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    const { login } = userInfo;
    let user;
    try {
      user = await this.userModel.findOne({
        where: { nickname: login, provider: this.authType },
        raw: true,
      });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (user !== null) {
      const accessToken = this.authTokenService.createAccessToken(user);
      const refreshToken = this.authTokenService.createRefreshToken(user);

      return { success: true, accessToken, refreshToken };
    }

    let newUser;
    try {
      newUser = (
        await this.userModel.create({
          nickname: login,
          provider: this.authType,
        })
      ).get({ plain: true });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    const accessToken = this.authTokenService.createAccessToken(user);
    const refreshToken = this.authTokenService.createRefreshToken(user);
    return { succes: true, accessToken, refreshToken };
  }
}

export default new GithubOauthService(user);
