import { param, body } from 'express-validator';

const paymentParamValidators = {
  paymentId: param('paymentId')
    .notEmpty()
    .withMessage('paymentId is Required')
    .isNumeric()
    .withMessage('paymentId is number'),
};

const paymentBodyValidators = {
  name: body('name')
    .notEmpty()
    .withMessage('name is Required')
    .isString()
    .withMessage('name is String'),
};

export function createPaymentVal() {
  return [paymentBodyValidators.name];
}

export function updatePaymentVal() {
  return [paymentBodyValidators.name, paymentParamValidators.paymentId];
}
export function deletePaymentVal() {
  return [paymentParamValidators.paymentId];
}
