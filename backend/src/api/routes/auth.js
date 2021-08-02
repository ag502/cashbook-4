import { Router } from 'express';

import authService from '../../services/auth.js';
import githubOauthService from '../../services/github-oauth.js';
import { errorTypes } from '../../errors/index.js';

import STATUS_CODES from '../../utils/http-status.js';

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
      return res.status(STATUS_CODES.OK).json(result);
    }
    if (result.error.errorType === errorTypes.LoginFailed) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json(result); // unauthorized
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
  });

  routes.post('/register', async (req, res) => {
    const { nickname, password } = req.body;
    const result = await authService.register({ nickname, password });
    if (result.success) {
      return res.status(STATUS_CODES.OK).json(result); // TODO: Status code 상수 처리 필요
    }
    if (result.error.errorType === errorTypes.AlreadyExist) {
      return res.status(STATUS_CODES.CONFLICT).json(result); // 409 conflict
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result); // 500 unexpect
  });

  routes.get('/github', (req, res) => {
    const redirectUrl = githubOauthService.getGithubAuthUrl();
    res.status(STATUS_CODES.OK).json(redirectUrl);
  });
  routes.post('/github-callback', async (req, res) => {
    const { code } = req.body;
    const result = await githubOauthService.githubLogin({ code });
    if (result.success) {
      return res.status(STATUS_CODES.OK).json(result);
    }
    if (result.error.errorType === errorTypes.LoginFailed) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json(result);
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
  });
};
