import errorTypes from '../errors/errorTypes.js';
import sequelize from '../models/index.js';
import getError from '../utils/error.js';

const { payment, user } = sequelize.models;

class PaymentService {
  constructor(paymentModel, userModel) {
    this.paymentModel = paymentModel;
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
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
    if (!flag) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
    return { success: true };
  }
  async getPayments({ userId }) {
    let payments;
    try {
      payments = await this.paymentModel.findAll({
        where: { user_id: userId },
        attributes: ['id', 'name'],
        raw: true,
      });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    return { success: true, data: payments !== null ? payments : [] };
  }
  async updatePayment({ userId, paymentId, newName }) {
    let targetPayment;
    try {
      targetPayment = await this.paymentModel.findOne({
        where: {
          id: paymentId,
          user_id: userId,
        },
        raw: true,
      });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (!targetPayment) {
      return { success: false, error: getError(errorTypes.NotExist) };
    }

    let deletedCount;
    let flag = false;
    try {
      const result = await this.paymentModel.update(
        { name: newName },
        {
          where: { id: paymentId },
          raw: true,
          returning: true,
          plain: true,
        }
      );
      console.log(result);
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (!flag) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
    return { success: true };
  }

  async deletePayment({ userId, paymentId }) {
    let targetPayment;
    try {
      targetPayment = await this.paymentModel.findOne({
        where: {
          id: paymentId,
          user_id: userId,
        },
        raw: true,
      });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (!targetPayment) {
      return { success: false, error: getError(errorTypes.NotExist) };
    }

    let deletedCount;
    let flag = false;
    try {
      deletedCount = await this.paymentModel.destroy({
        where: { id: paymentId },
        raw: true,
      });

      if (deletedCount >= 1) {
        flag = true;
      }
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (!flag) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
    return { success: true };
  }
}

export default new PaymentService(payment, user);
