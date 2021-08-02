import { Router } from 'express';

import authService from '../../services/auth.js';
import githubOauthService from '../../services/github-oauth.js';
import { errorTypes } from '../../errors/index.js';

import env from '../../config/env.js';

export default (app) => {
  const routes = Router();
  app.use('/auth', routes);

  routes.get('/check', async (req, res) => {
    console.log(authService);
  });

  routes.post('/login', async (req, res) => {
    const { nickname, password } = req.body;
    const result = await authService.login({ nickname, password });
    if (result.success) {
      return res.status(200).json(result);
    }
    if (result.error.errorType === errorTypes.LoginFailed) {
      return res.status(401).json(result); // unauthorized
    }
    return res.status(500).json(result);
  });

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

  routes.get('/github', (req, res) => {
    const redirectUrl = githubOauthService.getGithubAuthUrl();
    res.json(redirectUrl);
  });
  routes.post('/github-callback', async (req, res) => {
    const { code, state } = req.body;
    const result = await githubOauthService.githubLogin({ code, state });
    if (result.success) {
      return res.status(200).json(result);
    }
    if (result.error.errorType === errorTypes.LoginFailed) {
      return res.status(401).json(result);
    }
    return res.status(500).json(result);
  });
};
