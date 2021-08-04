import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import paymentService from '../../services/payment.js';
import errorTypes from '../../errors/errorTypes.js';
import STATUS_CODES from '../../utils/http-status.js';

export default (app) => {
  const routes = Router();
  app.use('/payment', routes);
  routes.use('/', authMiddleware);
  routes.get('/', async (req, res) => {
    const { id } = req['decoded'];

    const result = await paymentService.getPayment({ userId: id });

    if (!result.success) {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
    }
    return res.status(STATUS_CODES.OK).json(result);
  });

  routes.post('/', async (req, res) => {
    //TODO: 결제수단 추가

    const { id } = req['decoded'];
    const { name } = req.body;
    const result = await paymentService.createPayment({ userId: id, name });

    if (!result.success) {
      if (result.error.errorType === errorTypes.AlreadyExist) {
        return res.status(STATUS_CODES.CONFLICT).json(result);
      }
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
    }

    return res.status(STATUS_CODES.OK).json(result);
  });

  routes.delete('/', async (req, res) => {
    //TODO: 결제수단 삭제
  });
};
