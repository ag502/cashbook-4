import { assert } from 'chai';
import request from 'request';

import sequelize from '../src/models/index.js';

const BASEURL = 'http://localhost:3000';

const user1 = {
  nickname: 'secretjuju1',
  password: 'secretjuju1',
};

const githubUser = {
  nickname: 'SecretJuJu',
  provider: 'github',
};

describe('user_test', () => {
  before(async () => {
    console.log('user 테이블 초기화');
    const userModel = sequelize.models.user;
    await userModel.destroy({ where: {}, truncate: { cascade: true } });
    await userModel.create(githubUser);
  });
  describe('register 테스트', () => {
    it('basic 회원가입 테스트(user1)', (done) => {
      request.post(
        BASEURL + '/api/auth/register',
        {
          body: user1,
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
    it('nickname이 이미 존재할때 alreadyExist', (done) => {
      request.post(
        BASEURL + '/api/auth/register',
        {
          body: user1,
          json: true,
        },
        (err, res, body) => {
          if (err) {
            console.log(err);
          }
          if (body.error.errorType === 'alreadyExist') {
            assert(true);
          } else {
            assert(false);
          }
          done();
        }
      );
    });
    it('존재하는 github유저와 같은 nickname으로 회원가입', (done) => {
      githubUser.password = 'impassword';
      request.post(
        BASEURL + '/api/auth/register',
        {
          body: githubUser,
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

  describe('login 테스트', () => {
    it('basic 로그인 테스트 (user1)', (done) => {
      request.post(
        BASEURL + '/api/auth/login',
        {
          body: user1,
          json: true,
        },
        (err, res, body) => {
          if (err) {
            console.log(err);
          }
          if (!body.success) {
            console.log(body);
          } else {
            user1.token = body.accessToken;
          }
          assert(body.success);
          done();
        }
      );
    });

    it('없는 nickname 의 로그인 테스트 (user1)', (done) => {
      const customUser = user1;
      customUser.nickname += 'aa';
      request.post(
        BASEURL + '/api/auth/login',
        {
          body: customUser,
          json: true,
        },
        (err, res, body) => {
          if (err) {
            console.log(err);
          }
          let flag = false;
          if (body?.error?.errorType === 'loginFailed') {
            flag = true;
          }
          assert(flag);
          done();
        }
      );
    });

    it('패스워드가 다른 로그인 테스트 (user1)', (done) => {
      const customUser = user1;
      customUser.password += 'aa';
      request.post(
        BASEURL + '/api/auth/login',
        {
          body: customUser,
          json: true,
        },
        (err, res, body) => {
          if (err) {
            console.log(err);
          }
          let flag = false;
          if (body?.error?.errorType === 'loginFailed') {
            flag = true;
          }
          assert(flag);
          done();
        }
      );
    });
  });
});
