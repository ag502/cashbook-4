import { assert } from 'chai';
import request from 'request';

describe('user_test', function () {
  it('mictest', (done) => {
    request.get('http://localhost:3000/api/auth/check', (err, res, body) => {
      body = JSON.parse(body);
      assert(body.success);
      done();
    });
  });
});
