import { assert } from 'chai';
import request from 'request';
import { errorTypes } from '../src/errors/index.js';

const payment1 = {
  name: '현대카드',
};

const paymentTest = ({ BASEURL, userInfo }) =>
  new Promise((paymentTestResolve, paymentTestReject) => {
    describe('payment test', () => {
      describe('Create 테스트', () => {
        it('basic create payment 테스트', (done) => {
          request.post(
            BASEURL + '/api/payment',
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
              body: payment1,
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (!body.success) {
                console.log(body);
              }
              assert(body.success);
              done();
            }
          );
        });
        it('로그인 안하고 create payment 테스트', (done) => {
          request.post(
            BASEURL + '/api/payment',
            {
              body: payment1,
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (body.success) {
                assert(false);
              } else {
                if (body.error.errorType === errorTypes.UnAuhorized) {
                  assert(true);
                } else {
                  assert(false);
                }
              }
              done();
            }
          );
        });
      });

      after(() => {
        paymentTestResolve();
      });
    });
  });

export default paymentTest;
