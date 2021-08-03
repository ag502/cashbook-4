import { Router } from 'express';

import authService from '../../services/auth.js';
import authTokenService from '../../services/auth-token.js';
import githubOauthService from '../../services/github-oauth.js';
import userService from '../../services/user.js';

import { errorTypes } from '../../errors/index.js';

import authMiddleware from '../middlewares/authMiddleware.js';

import STATUS_CODES from '../../utils/http-status.js';
import getError from '../../utils/error.js';

export default (app) => {
  const routes = Router();
  app.use('/auth', routes);

  routes.get('/check', authMiddleware, async (req, res) => {
    return res.status(STATUS_CODES.OK).json({ success: true });
  });

  routes.get('/token', async (req, res) => {
    const refreshToken = req?.cookies?.refreshToken;
    const tokenVerifyResult = authTokenService.verifyToken(refreshToken);

    if (!tokenVerifyResult.success) {
      if (tokenVerifyResult.error.errorType === errorTypes.TokenExpired) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ success: false, error: getError(errorTypes.TokenExpired) });
      } else {
        return res.status(STATUS_CODES.BAD_REQUEST).json(tokenVerifyResult); // refresh token이 valid하지 않을때
      }
    }

    const decoded = tokenVerifyResult.decoded;
    const user = await userService.getUserById(decoded.iss);

    if (user.success) {
      const newAccessToken = authTokenService.createAccessToken(user.data);
      return res
        .status(STATUS_CODES.OK)
        .json({ success: true, accessToken: newAccessToken });
    }

    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(getError(errorTypes.UnexpectError));
  });

  routes.post('/login', async (req, res) => {
    const { nickname, password } = req.body;
    const result = await authService.login({ nickname, password });
    if (result.success) {
      const { accessToken, refreshToken } = result;
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      return res
        .status(STATUS_CODES.OK)
        .json({ success: result.success, accessToken });
    }
    if (result.error.errorType === errorTypes.LoginFailed) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json(result);
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(result);
  });

  routes.post('/register', async (req, res) => {
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

  routes.post('/github', async (req, res) => {
    const { code } = req.body;
    const result = await githubOauthService.githubLogin({ code });
    if (result.success) {
      const { accessToken, refreshToken } = result;
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
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
