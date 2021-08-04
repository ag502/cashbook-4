import { param, body } from 'express-validator';

const accountParamValidators = {
  date: param('date')
    .notEmpty()
    .withMessage('date is Required')
    .isString()
    .withMessage('date is String'),
  categoryId: param('categoryId')
    .notEmpty()
    .withMessage('categoryId is Required')
    .isString()
    .withMessage('categoryId is String'),
};

const accountBodyValidators = {
  date: body('date')
    .notEmpty()
    .withMessage('date is Required')
    .isString()
    .withMessage('date is String'),
  price: body('price')
    .notEmpty()
    .withMessage('price is Required')
    .isDecimal()
    .withMessage('price is Decimal'),
  content: body('content')
    .isString()
    .withMessage('content is String')
    .optional({ nullable: true }),
  categoryId: body('categoryId')
    .isNumeric()
    .withMessage('categoryId is String')
    .optional({ nullable: true }),
  paymentId: body('paymentId')
    .isNumeric()
    .withMessage('paymentId is number')
    .optional({ nullable: true }),
};

export function getMonthAccountsVal() {
  return [accountParamValidators.date];
}

export function getYearAccountsVal() {
  return [accountParamValidators.date, accountParamValidators.categoryId];
}

export function createAccountVal() {
  return [
    accountBodyValidators.date,
    accountBodyValidators.price,
    accountBodyValidators.content,
    accountBodyValidators.paymentId,
    accountBodyValidators.categoryId,
  ];
}
