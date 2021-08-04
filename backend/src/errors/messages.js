import errorTypes from './errorTypes.js';

const errorMessages = {
  [errorTypes.NicknameExist]: '이미 같은 닉네임이 존재합니다.',
  [errorTypes.UnexpectError]: '예끼치 못한 에러 발생.',
  [errorTypes.LoginFailed]: '로그인 실패.',
  [errorTypes.TokenExpired]: '토큰이 만료됨.',
  [errorTypes.UnValidToken]: '유효하지 않은 토큰.',
  [errorTypes.BadRequest]: '잘못된 요청.',
  [errorTypes.UnAuhorized]: '인증되지 않음',
  [errorTypes.NotExist]: '정보가 존재하지 않음',
};

export default errorMessages;
