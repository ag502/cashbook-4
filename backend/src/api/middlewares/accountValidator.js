import { param } from 'express-validator';

const accountValidators = {
  date: param('date')
    .notEmpty()
    .withMessage('date is Required')
    .isString()
    .withMessage('date is String'),
  categoryId: param('categoryId')
    .notEmpty()
    .withMessage('category is Required')
    .isString()
    .withMessage('cateogry is String'),
};

export function getMonthAccountsVal() {
  return [accountValidators.date];
}

export function getYearAccountsVal() {
  return [accountValidators.date, accountValidators.categoryId];
}
