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
          'id',
          ['payment_id', 'payment'],
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

  _addEmptyMonth(yearAccountsByCategory) {
    const fullYearAccount = [...Array(12).keys()].reduce((obj, month) => {
      return { ...obj, [month + 1]: 0 };
    }, {});
    yearAccountsByCategory.forEach(({ price, month }) => {
      fullYearAccount[month] = Math.abs(price);
    });
    return fullYearAccount;
  }

  async getYearAccountsByCategory(date, categoryId, userId) {
    const curYear = new Date(date).getFullYear();
    try {
      const yearAccountsByCategory = await this.accountModel.findAll({
        include: [
          { model: this.userModel, attributes: [] },
          {
            model: this.paymentModel,
            attributes: [],
          },
        ],
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('price')), 'price'],
          [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        ],
        where: {
          [Sequelize.Op.and]: [
            { user_id: userId },
            { category_id: categoryId },
            { price: { [Sequelize.Op.lt]: 0 } },
            {
              date: sequelize.where(
                sequelize.fn('YEAR', sequelize.col('date')),
                curYear
              ),
            },
          ],
        },
        group: [Sequelize.fn('Month', Sequelize.col('date'))],
        order: [[Sequelize.fn('MONTH', Sequelize.col('date')), 'ASC']],
        raw: true,
      });
      return {
        success: true,
        result: this._addEmptyMonth(yearAccountsByCategory),
      };
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }
  }

  async createAccount({ userId, accountInfo }) {
    const { date, price, content, paymentId, categoryId } = accountInfo;

    let flag = false;
    try {
      const result = (
        await this.accountModel.create(
          {
            date,
            price,
            content,
            payment_id: paymentId,
            category_id: categoryId,
            user_id: userId,
          },
          { treatUndefinedAsNull: false }
        )
      ).get({ plain: true });

      if (result.user_id === userId) {
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

  async updateAccount({ userId, accountInfo }) {
    const { id, date, price, content, paymentId, categoryId } = accountInfo;

    let isExistAccount;
    try {
      isExistAccount = await this.accountModel.findOne({
        where: { user_id: userId, id },
        raw: true,
      });
    } catch (err) {
      return { success: false, error: getError(errorTypes.UnexpectError) };
    }

    if (!isExistAccount) {
      return { success: false, error: getError(errorTypes.NotExist) };
    }

    let flag = false;
    try {
      const result = await this.accountModel.update(
        {
          date,
          price,
          content,
          payment_id: paymentId,
          category_id: categoryId,
          user_id: userId,
        },
        {
          where: {
            id,
          },
          raw: true,
          returning: true,
          plain: true,
          treatUndefinedAsNull: false,
        }
      );

      if (result[1] >= 1) {
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

export default new AccountService();
