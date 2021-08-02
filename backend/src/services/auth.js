import sequelize from '../models/index.js';

import authTokenService from './auth-token.js';

import { errorTypes } from '../errors/index.js';
import getError from '../utils/error.js';
import { createHashedPassword, checkPassword } from '../utils/user.js';

const { user } = sequelize.models;

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
    this.authTokenService = authTokenService;
    this.authType = 'local';
  }

  async register({ nickname, password }) {
    const isExistUser = await this.userModel.findOne({
      where: { nickname, provider: this.authType },
      raw: true,
    }); // null or user object

    if (isExistUser !== null) {
      return { success: false, error: getError(errorTypes.AlreadyExist) };
    }

    const hashedPassword = createHashedPassword(password);
    let flag = false;
    try {
      const result = (
        await this.userModel.create({
          nickname,
          password: hashedPassword,
        })
      ).get({ plain: true });

      if (result.nickname === nickname) {
        flag = true;
      }
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (flag) {
      return { success: true };
    }
    return { success: false, error: getError(errorTypes.UnexpectError) };
  }

  async login({ nickname, password }) {
    const user = await this.userModel.findOne({
      where: { nickname, provider: this.authType },
      raw: true,
    });

    if (user === null) {
      return { success: false, error: getError(errorTypes.LoginFailed) };
    }

    if (await checkPassword(password, user.password)) {
      const accessToken = this.authTokenService.createAccessToken(user);
      const refreshToken = this.authTokenService.createRefreshToken(user);
      return { success: true, accessToken, refreshToken };
    }

    return { success: false, error: getError(errorTypes.LoginFailed) };
  }
}

export default new AuthService(user);
