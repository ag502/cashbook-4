import { body } from 'express-validator';

const authBodyValidators = {
  nickname: body('nickname')
    .notEmpty()
    .withMessage('nickname is Required')
    .isString()
    .withMessage('nickname is String'),
  password: body('password')
    .notEmpty()
    .withMessage('password is Required')
    .isString()
    .withMessage('password is String'),
  code: body('code')
    .notEmpty()
    .withMessage('code is Required')
    .isString()
    .withMessage('code is String'),
};

export function loginVal() {
  return [authBodyValidators.nickname, authBodyValidators.password];
}

export function registerVal() {
  return [authBodyValidators.nickname, authBodyValidators.password];
}

export function githubAuthVal() {
  return [authBodyValidators.code];
}
