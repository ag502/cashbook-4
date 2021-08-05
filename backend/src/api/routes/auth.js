import { Router } from 'express';
import { validationResult } from 'express-validator';

import authService from '../../services/auth.js';
import authTokenService from '../../services/auth-token.js';
import githubOauthService from '../../services/github-oauth.js';
import userService from '../../services/user.js';

import { errorTypes } from '../../errors/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';

import STATUS_CODES from '../../utils/http-status.js';
import getError from '../../utils/error.js';

import {
  loginVal,
  registerVal,
  githubAuthVal,
} from '../middlewares/authValidator.js';

export default (app) => {
  const routes = Router();
  app.use('/auth', routes);

  routes.get('/check', authMiddleware, async (req, res) => {
    return res.status(STATUS_CODES.OK).json({ success: true });
  });

  routes.post('/login', loginVal(), async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ error: getError(errorTypes.ValidationError) });
    }

    const { nickname, password } = req.body;
    const result = await authService.login({ nickname, password });
    if (result.success) {
      const { accessToken } = result;
      return res
        .status(STATUS_CODES.OK)
        .json({ success: result.success, accessToken });
    }
    if (result.error.errorType === errorTypes.LoginFailed) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json(result);
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
  });

  routes.post('/register', registerVal(), async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ error: getError(errorTypes.ValidationError) });
    }
    const { nickname, password } = req.body;
    const result = await authService.register({ nickname, password });
    if (result.success) {
      return res.status(STATUS_CODES.OK).json(result);
    }
    if (result.error.errorType === errorTypes.AlreadyExist) {
      return res.status(STATUS_CODES.CONFLICT).json(result);
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
  });

  routes.get('/github', (req, res) => {
    const redirectUrl = githubOauthService.getGithubAuthUrl();
    res.status(STATUS_CODES.OK).json(redirectUrl);
  });

  routes.post('/github', githubAuthVal(), async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ error: getError(errorTypes.ValidationError) });
    }
    const { code } = req.body;
    const result = await githubOauthService.githubLogin({ code });
    if (result.success) {
      const { accessToken } = result;

      return res
        .status(STATUS_CODES.OK)
        .json({ success: result.success, accessToken });
    }
    if (result.error.errorType === errorTypes.LoginFailed) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json(result);
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
  });
};
