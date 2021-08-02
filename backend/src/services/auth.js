import sequelize from '../models/index.js';
import jwt from 'jsonwebtoken';

import { errorTypes } from '../errors/index.js';
import getError from '../utils/error.js';
import { createHashedPassword, checkPassword } from '../utils/user.js';
import env from '../config/env.js';

const { user } = sequelize.models;

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
    this.authTypes = {
      local: 'local',
      oauth: {
        github: 'github',
      },
    };
  }

  async register({ nickname, password }) {
    const isExistUser = await this.userModel.findOne({
      where: { nickname },
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
      where: { nickname },
      raw: true,
    });

    if (user === null) {
      return { success: false, error: getError(errorTypes.LoginFailed) };
    }

    if (await checkPassword(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, nickname: user.nickname, provider: user.provider },
        env.JWT_SECRET
      );

      return { success: true, token };
    }

    return { success: false, error: getError(errorTypes.LoginFailed) };
  }
}

export default new AuthService(user);
