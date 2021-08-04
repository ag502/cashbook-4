import authTest from './auth.test.js';
import paymentTest from './payment.test.js';
import accountTest from './account.test.js';

import sequelize from '../src/models/index.js';
import { assert } from 'chai';

const BASEURL = 'http://localhost:3000';
const githubUser = {
  nickname: 'SecretJuJu',
  provider: 'github',
};

describe('cashbook 백엔드 테스트 시작', async () => {
  before(async () => {
    console.log('------- 테이블 초기화 --------');
    const userModel = sequelize.models.user;
    const paymentModel = sequelize.models.payment;
    const accountModel = sequelize.models.account;
    await userModel.destroy({ where: {}, truncate: { cascade: true } });
    await userModel.create(githubUser);
    await paymentModel.destroy({ where: {}, truncate: { cascade: true } });
    await accountModel.destroy({ where: {}, truncate: { cascade: true } });
  });
  const userInfo = await authTest({ githubUser, BASEURL });
  const paymentInfo = await paymentTest({ userInfo, BASEURL });
  const accountInfo = await accountTest({ paymentInfo, userInfo, BASEURL });
  console.log(paymentInfo);
});
