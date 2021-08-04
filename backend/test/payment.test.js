import { assert } from 'chai';
import request from 'request';

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
      });

      after(() => {
        paymentTestResolve();
      });
    });
  });

export default paymentTest;
