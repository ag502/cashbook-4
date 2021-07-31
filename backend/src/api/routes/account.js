import { Router } from 'express';

export default (app) => {
  const routes = Router();
  app.use('/account', routes);

  // TODO: authMiddleware 추가
  routes.get('/', async (req, res) => {
    // TODO: month에따라 account 반환
  });

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
