import errorTypes from '../errors/errorTypes.js';
import sequelize from '../models/index.js';
import getError from '../utils/error.js';

import authTokenService from './auth-token.js';

const { user } = sequelize.models;

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
    this.authTokenService = authTokenService;
  }

  async getUserById(id) {
    try {
      const user = await this.userModel.findOne({ where: { id }, raw: true });
      return { success: true, data: user };
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
  }
}

export default new UserService(user);
