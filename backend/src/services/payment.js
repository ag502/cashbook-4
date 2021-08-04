import errorTypes from '../errors/errorTypes.js';
import sequelize from '../models/index.js';
import getError from '../utils/error.js';

import authTokenService from './auth-token.js';

const { payment, user } = sequelize.models;

class PaymentService {
  constructor(paymentModel, userModel) {
    this.paymentModel = paymentModel;
    this.userModel = userModel;
  }

  async createPayment({ userId, name }) {
    let isExistPayment;
    try {
      isExistPayment = await this.paymentModel.findOne({
        where: {
          user_id: userId,
          name,
        },
        raw: true,
      });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (isExistPayment) {
      // already exist
      return { success: false, error: getError(errorTypes.AlreadyExist) };
    }

    let newPayment;
    let flag = false;
    try {
      newPayment = (
        await this.paymentModel.create({ user_id: userId, name })
      ).get({ plain: true });
      if (newPayment.name === name) {
        flag = true;
      }
    } catch (err) {
      console.log(err);
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
    if (!flag) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
    return { success: true };
  }
}

export default new PaymentService(payment, user);
