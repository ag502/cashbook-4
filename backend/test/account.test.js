import { assert } from 'chai';
import request from 'request';
import { errorTypes } from '../src/errors/index.js';

const accountInfo = {
  date: new Date('2021/08/05'),
  price: '-10000',
  content: '국밥 2그릇 (할인쿠폰 적용)',
  paymentId: null,
  category: null,
};

const accountTest = ({ BASEURL, userInfo, paymentInfo }) =>
  new Promise((accountTestResolve, accountTestReject) => {
    describe('account test', () => {
      it('테스트 테스트', (done) => {
        assert(true);
        done();
      });
    });
  });

export default accountTest;
