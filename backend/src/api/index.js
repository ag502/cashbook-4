import { Router } from 'express';
import account from './routes/account.js';
import auth from './routes/auth.js';
import payment from './routes/payment.js';

export default () => {
  const app = Router();
  auth(app);
  account(app);
  payment(app);

  return app;
};
