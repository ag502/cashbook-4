import { Router } from 'express';
import authService from '../../services/auth.js';
import { errorTypes } from '../../errors/index.js';

export default (app) => {
  const routes = Router();
  app.use('/auth', routes);

  routes.get('/check', async (req, res) => {
    console.log(authService);
  });
  routes.post('/login', async (req, res) => {});
  routes.post('/register', async (req, res) => {
    const { nickname, password } = req.body;
    const result = await authService.register({ nickname, password });
    if (result.success) {
      return res.status(200).json(result); // TODO: Status code 상수 처리 필요
    }
    if (result.error.errorType === errorTypes.AlreadyExist) {
      return res.status(409).json(result); // 409 conflict
    }
    return res.status(500).json(result); // 500 unexpect
  });

  routes.get('/oauth-github', async (req, res) => {});
};
