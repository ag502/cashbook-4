import env from '../config/env.js';
import jwt from 'jsonwebtoken';

class AuthTokenService {
  constructor() {
    this.accessTokenExpireTime = env.ACCESS_TOKEN_EXPIRE_TIME;
    this.refreshTokenExpireTime = env.REFRESH_TOKEN_EXPIRE_TIME;
  }

  createAccessToken({ id, nickname, provider }) {
    return jwt.sign({ id, nickname, provider }, env.JWT_SECRET, {
      expiresIn: this.accessTokenExpireTime,
      issuer: id,
    });
  }

  createRefreshToken({ id }) {
    return jwt.sign({}, env.JWT_SECRET, {
      expiresIn: this.refreshTokenExpireTime,
      issuer: id,
    });
  }
}

export default new AuthTokenService();
