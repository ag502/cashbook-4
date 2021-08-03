import errorTypes from '../../errors/errorTypes.js';
import authTokenService from '../../services/auth-token.js';
import getError from '../../utils/error.js';
import STATUS_CODES from '../../utils/http-status.js';

const authMiddleware = async (req, res, next) => {
  const accessToken = req.headers?.authorization?.split(' ')[1]; // remove bearer tag
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken) {
    return res.status(STATUS_CODES.UNAUTHORIZED);
  }

  const validResult = authTokenService.verifyToken(accessToken);
  if (validResult.success) {
    req['decoded'] = validResult.decoded;
    // const isRefreshTokenVaild = authTokenService.verifyToken(refreshToken);
    // if (!isRefreshTokenVaild.success) {
    //   if (isRefreshTokenVaild.error.errorType === errorTypes.TokenExpired) {
    //     const newRefreshToken = authTokenService.createRefreshToken({
    //       id: req['decoded'].iss,
    //     });

    //     res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
    //   } else {
    //     return res.status(STATUS_CODES.BAD_REQUEST).json(isRefreshTokenVaild); // refresh token이 valid하지 않을때
    //   }
    // }
    return next();
  }
  if (validResult.error.errorType === errorTypes.TokenExpired) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json(validResult);
  }
  if (validResult.error.errorType === errorTypes.UnValidToken) {
    return res.status(STATUS_CODES.BAD_REQUEST).json(validResult);
  }

  return res
    .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json(getError(errorTypes.UnexpectError));
};

export default authMiddleware;
