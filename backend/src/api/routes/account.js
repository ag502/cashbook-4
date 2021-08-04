import { Router } from 'express';
import { validationResult } from 'express-validator';

import accountService from '../../services/account.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import {
  getMonthAccountsVal,
  getYearAccountsVal,
} from '../middlewares/accountValidator.js';
import getError from '../../utils/error.js';
import { errorTypes } from '../../errors/index.js';
import STATUS_CODES from '../../utils/http-status.js';

export default (app) => {
  const routes = Router();
  routes.use('/', authMiddleware);
  app.use('/account', routes);

  routes.get('/:date', getMonthAccountsVal(), async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ error: getError(errorTypes.ValidationError) });
    }

    const { id } = req.decoded;
    const { date } = req.params;
    const result = await accountService.getAccountsByMonth(date, id);

    if (result.success) {
      return res.status(STATUS_CODES.OK).json(result);
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
  });

  routes.get(
    '/category-year-expenditure/:date/:categoryId',
    getYearAccountsVal(),
    async (req, res) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: getError(errorTypes.ValidationError) });
      }

      const { id } = req.decoded;
      const { categoryId, date } = req.params;
      const result = await accountService.getYearAccountsByCategory(
        date,
        categoryId,
        id
      );

      if (result.success) {
        return res.status(STATUS_CODES.OK).json(result);
      }
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
    }
  );

  routes.post('/', async (req, res) => {
    //TODO: account 등록
  });

  routes.put('/:accountId', async (req, res) => {
    //TODO: account 수정
  });

  routes.delete('/:accountId', async (req, res) => {
    //TODO: account 삭제
  });
};
