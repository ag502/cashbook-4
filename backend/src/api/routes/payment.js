import { Router } from 'express';

export default (app) => {
  const routes = Router();
  app.use('/payment', routes);

  routes.get('/', async (req, res) => {
    //TODO: 결제수단
  });

  routes.post('/', async (req, res) => {
    //TODO: 결제수단 추가
  });

  routes.delete('/', async (req, res) => {
    //TODO: 결제수단 삭제
  });
};
