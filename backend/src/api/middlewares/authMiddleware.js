import errorTypes from '../../errors/errorTypes.js';
import authTokenService from '../../services/auth-token.js';
import getError from '../../utils/error.js';
import STATUS_CODES from '../../utils/http-status.js';

const authMiddleware = async (req, res, next) => {
  const accessToken = req.headers?.authorization?.split(' ')[1]; // remove bearer tag

  if (!accessToken) {
    return res.status(STATUS_CODES.UNAUTHORIZED);
  }

  const validResult = authTokenService.verifyToken(accessToken);

  if (validResult.success) {
    req['decoded'] = validResult.decoded;
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
