import sequelize from '../models/index.js';
import { errorTypes } from '../errors/index.js';
import getError from '../utils/error.js';
import { createHashedPassword, checkPassword } from '../utils/user.js';

const { user } = sequelize.models;

class AuthService {
  constructor(userModel) {
    this.user = userModel;
  }

  async register({ nickname, password }) {
    const isExistUser = await this.user.findOne({
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
        await this.user.create({
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
}

export default new AuthService(user);
