import { assert } from 'chai';
import request from 'request';
import { errorTypes } from '../src/errors/index.js';

const payment1 = {
  name: '현대카드',
};

const payment2 = {
  name: '삼성카드',
};

const paymentTest = ({ BASEURL, userInfo }) =>
  new Promise((paymentTestResolve, paymentTestReject) => {
    describe('payment test', () => {
      describe('Create 테스트', () => {
        it('basic create payment 테스트1', (done) => {
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
        it('basic create payment 테스트2', (done) => {
          request.post(
            BASEURL + '/api/payment',
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
              body: payment2,
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
      describe('Read 테스트', () => {
        it('basic Read payment 테스트', (done) => {
          request.get(
            BASEURL + '/api/payment',
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (!body.success) {
                console.log(body);
              }

              const firstPayment = body?.data?.find(
                (e) => e.name === '현대카드'
              );
              const secondPayment = body?.data?.find(
                (e) => e.name === '삼성카드'
              );
              payment1.id = firstPayment.id;
              payment2.id = secondPayment.id;
              if (body.data.length === 2) {
                assert(body.success);
              } else {
                assert(false);
              }

              done();
            }
          );
        });
        it('로그인 없이 Read payment 테스트', (done) => {
          request.get(
            BASEURL + '/api/payment',
            {
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (!body.success) {
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

      describe('Update 테스트', () => {
        it('로그인 없이 update payment 테스트', (done) => {
          request.put(
            BASEURL + '/api/payment/' + payment1.id,
            {
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (!body.success) {
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
        it('이미 있는 name으로 update payment 테스트', (done) => {
          request.put(
            BASEURL + '/api/payment/' + payment1.id,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
              body: { name: '삼성카드' },
              json: true,
            },
            (err, res, body) => {
              if (!body.success) {
                if (body.error.errorType === errorTypes.AlreadyExist) {
                  assert(true);
                } else {
                  assert(false);
                }
              }
              done();
            }
          );
        });
        it('basic update payment 테스트', (done) => {
          request.put(
            BASEURL + '/api/payment/' + payment2.id,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
              body: { name: '사암성카드' },
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
        it('존재하지않는 payment에 update payment 테스트', (done) => {
          request.put(
            BASEURL + '/api/payment/' + (payment1.id + 300),
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
              body: { name: '비트코인' },
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (!body.success) {
                if (body.error.errorType === errorTypes.NotExist) {
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
      describe('Delete 테스트', () => {
        it('로그인 없이 delete payment 테스트', (done) => {
          request.delete(
            BASEURL + '/api/payment/' + payment1.id,
            {
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (!body.success) {
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
        it('basic delete payment 테스트', (done) => {
          request.delete(
            BASEURL + '/api/payment/' + payment1.id,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
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
        it('존재하지않는 payment에 delete payment 테스트', (done) => {
          request.delete(
            BASEURL + '/api/payment/' + (payment1.id + 300),
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
              json: true,
            },
            (err, res, body) => {
              if (err) {
                console.log(err);
              }
              if (!body.success) {
                if (body.error.errorType === errorTypes.NotExist) {
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
        paymentTestResolve(payment2);
      });
    });
  });

export default paymentTest;
