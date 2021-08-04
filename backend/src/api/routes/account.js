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

const yearExpenditureByCateogry = {
  1: {
    1: 3000,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 0,
    12: 12324,
  },
  2: {
    1: 5000,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 99999,
    9: 0,
    10: 87890,
    11: 0,
    12: 12324,
  },
  3: {
    1: 0,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 3234,
    9: 19090,
    10: 87890,
    11: 0,
    12: 0,
  },
  4: {
    1: 3000,
    2: 1200,
    3: 34890,
    4: 13220,
    5: 99999,
    6: 0,
    7: 39800,
    8: 89399,
    9: 19090,
    10: 87890,
    11: 0,
    12: 12324,
  },
  5: {
    1: 49022,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 129099,
    6: 0,
    7: 0,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 0,
    12: 0,
  },
  6: {
    1: 3000,
    2: 12300,
    3: 34890,
    4: 87813,
    5: 0,
    6: 0,
    7: 29800,
    8: 99999,
    9: 49090,
    10: 0,
    11: 0,
    12: 12324,
  },
  7: {
    1: 12320,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 23843,
    6: 90231,
    7: 39800,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 77777,
    12: 12324,
  },
  8: {
    1: 89212,
    2: 0,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 99999,
    9: 0,
    10: 87890,
    11: 0,
    12: 12324,
  },
  9: {
    1: 47213,
    2: 12300,
    3: 12321,
    4: 43220,
    5: 0,
    6: 0,
    7: 0,
    8: 99999,
    9: 12314,
    10: 87890,
    11: 0,
    12: 12324,
  },
  10: {
    1: 12390,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 12314,
    7: 39800,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 89123,
    12: 12324,
  },
};

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
