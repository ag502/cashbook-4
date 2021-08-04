import authTest from './auth.test.js';
import paymentTest from './payment.test.js';

import sequelize from '../src/models/index.js';

const BASEURL = 'http://localhost:3000';
const githubUser = {
  nickname: 'SecretJuJu',
  provider: 'github',
};
let userInfo;
describe('cashbook 백엔드 테스트 시작', async () => {
  before(async () => {
    console.log('------- 테이블 초기화 --------');
    const userModel = sequelize.models.user;
    const paymentModel = sequelize.models.payment;
    await userModel.destroy({ where: {}, truncate: { cascade: true } });
    await userModel.create(githubUser);
    await paymentModel.destroy({ where: {}, truncate: { cascade: true } });
  });
  userInfo = await authTest({ githubUser, BASEURL });
  await paymentTest({ userInfo, BASEURL });
});
