import { Sequelize } from 'sequelize';
// const { Op } = pkg;
console.log(Sequelize.Op.and);

import sequelize from '../models/index.js';

import { errorTypes } from '../errors/index.js';
import getError from '../utils/error.js';

const { user, account, payment } = sequelize.models;

class AccountService {
  constructor() {
    this.userModel = user;
    this.accountModel = account;
    this.paymentModel = payment;
  }

  async getAccountsByMonth(date, userId) {
    const curDate = new Date(date);
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
    try {
      const accounts = await this.accountModel.findAll({
        include: [
          { model: this.userModel, attributes: [] },
          {
            model: this.paymentModel,
            attributes: [],
          },
        ],
        attributes: [
          ['category_id', 'category'],
          'price',
          'content',
          'date',
          [Sequelize.col('payment.name'), 'paymentMethod'],
        ],
        where: {
          user_id: userId,
          date: {
            [Sequelize.Op.between]: [firstDay, lastDay],
          },
        },

        raw: true,
      });
      return { success: true, accounts };
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
  }
}

export default new AccountService();
