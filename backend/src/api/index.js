import { Router } from 'express';

export default () => {
  const app = Router();
  // auth(app),
  app.use('', (req, res) => {
    res.send('test success');
  });
};
