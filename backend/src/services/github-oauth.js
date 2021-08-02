import sequelize from '../models/index.js';
import jwt from 'jsonwebtoken';

import { errorTypes } from '../errors/index.js';
import getError from '../utils/error.js';
import request from '../utils/await-request.js';
import env from '../config/env.js';

import qs from 'querystring';
import rs from 'randomstring';

const { user } = sequelize.models;

class GithubOauthService {
  constructor(userModel) {
    this.userModel = userModel;
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

    const { accessToken } = accessTokenResult;
    const userInfo = await this.getGithubUserInfo(accessToken);

    if (userInfo === null) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    const { login } = userInfo;
    let user;
    try {
      user = this.userModel.findOne({
        where: { nickname: login, provider: this.authType },
        raw: true,
      });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (user !== null) {
      const token = this.generateToken({
        id: user.id,
        nickname: user.nickname,
        provider: user.provider,
      });

      return { success: true, token };
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
    const token = this.generateToken({
      id: user.id,
      nickname: user.nickname,
      provider: user.provider,
    });
    return { succes: true, token };
  }
}

export default new GithubOauthService(user);

/*
{
  login: 'SecretJuJu',
  id: 47034129,
  node_id: 'MDQ6VXNlcjQ3MDM0MTI5',
  avatar_url: 'https://avatars.githubusercontent.com/u/47034129?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/SecretJuJu',
  html_url: 'https://github.com/SecretJuJu',
  followers_url: 'https://api.github.com/users/SecretJuJu/followers',
  following_url:
    'https://api.github.com/users/SecretJuJu/following{/other_user}',
  gists_url: 'https://api.github.com/users/SecretJuJu/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/SecretJuJu/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/SecretJuJu/subscriptions',
  organizations_url: 'https://api.github.com/users/SecretJuJu/orgs',
  repos_url: 'https://api.github.com/users/SecretJuJu/repos',
  events_url: 'https://api.github.com/users/SecretJuJu/events{/privacy}',
  received_events_url:
    'https://api.github.com/users/SecretJuJu/received_events',
  type: 'User',
  site_admin: false,
  name: 'SeungBo',
  company: null,
  blog: '',
  location: null,
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 31,
  public_gists: 0,
  followers: 9,
  following: 8,
  created_at: '2019-01-25T14:55:17Z',
  updated_at: '2021-08-02T04:37:26Z',
};
*/
