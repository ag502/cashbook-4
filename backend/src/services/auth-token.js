import env from '../config/env.js';
import jwt from 'jsonwebtoken';
import getError from '../utils/error.js';
import errorTypes from '../errors/errorTypes.js';

class AuthTokenService {
  constructor() {
    this.accessTokenExpireTime = env.ACCESS_TOKEN_EXPIRE_TIME;
    this.TokenExpiredError = 'TokenExpiredError';
  }

  createAccessToken({ id, nickname, provider }) {
    return jwt.sign({ id, nickname, provider }, env.JWT_SECRET, {
      expiresIn: this.accessTokenExpireTime,
      issuer: `${id}`,
    });
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      return { success: true, decoded };
    } catch (err) {
      if (err.name == this.TokenExpiredError) {
        return { success: false, error: getError(errorTypes.TokenExpired) };
      }
      return { success: false, error: getError(errorTypes.UnValidToken) };
    }
  }
}

export default new AuthTokenService();
