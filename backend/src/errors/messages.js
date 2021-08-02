import errorType from './errorTypes.js';

const errorMessages = {
  [errorType.NicknameExist]: '이미 같은 닉네임이 존재합니다.',
  [errorType.UnexpectError]: '예끼치 못한 에러 발생.',
  [errorType.LoginFailed]: '로그인 실패.',
};

export default errorMessages;
