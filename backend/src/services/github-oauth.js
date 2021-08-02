import sequelize from '../models/index.js';
import jwt from 'jsonwebtoken';

import { errorTypes } from '../errors/index.js';
import getError from '../utils/error.js';
import request from '../utils/await-request.js';
import env from '../config/env.js';

import qs from 'querystring';
import rs from 'randomstring';

const { user } = sequelize.models;
let state;

class GithubOauthService {
  constructor(userModel) {
    this.userModel = userModel;
    this.authTypes = {
      local: 'local',
      oauth: {
        github: 'github',
      },
    };
  }

  getGithubAuthUrl() {
    state = rs.generate();

    const url = `${env.OAUTH_GITHUB_AUTH_URL}/authorize?`;
    const query = qs.stringify({
      client_id: env.OAUTH_GITHUB_CLIENT_ID,
      redirect_uri: env.FRONTEND_HOST + '/',
      state: state,
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
    return { success: true, token: result.access_token };
  }

  async getGithubUserInfo(accessToken) {
    const options = {
      uri: env.OAUTH_GITHUB_API_URL,
      headers: {},
    };
    const userInfo = request(options);
  }

  async githubLogin({ code, state }) {
    if (state !== state) {
      return { success: false, error: getError(errorTypes.LoginFailed) };
    }

    const accessTokenResult = await this._getGithubOauthAccessToken(code);
    if (!accessTokenResult.success) {
      return accessTokenResult;
    }

    const { accessToken } = accessTokenResult;
    const userInfo = await this.getGithubUserInfo(accessToken);
  }
}

export default new GithubOauthService(user);
