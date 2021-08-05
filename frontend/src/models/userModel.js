import authAPI from '../api/authAPI.js';
import paymentAPI from '../api/paymentAPI.js';

import observer from '@/common/utils/observer';
import notifyTypes from '../common/utils/notifyTypes';

import { getParams, removeURLParameter } from '@/common/utils/functions';

class UserModel {
  constructor() {
    this.isLogin = null;
    this.observer = observer;
    this.authAPI = authAPI;
    this.payments = [];
    this.init();
  }

  init = async () => {
    this.isLogin = await this.checkLogin();
    if (!this.isLogin) {
      const params = getParams();
      if (params?.code) {
        this.isLogin = await this.githubLogin(params.code);
        const newUrl = removeURLParameter(location.href, 'code');
        window.history.pushState({}, document.title, newUrl);
      }
    }

    if (this.isLogin) {
      await this.setPayments();
    }

    this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
    this.observer.subscribe(
      notifyTypes.CLICK_GITHUB_OAUTH,
      this,
      this.getGithubLoginURL
    );
    this.observer.subscribe(notifyTypes.CLICK_LOGOUT, this, this.logout);
  };

  _fetchPayments = async () => {
    const result = await paymentAPI.getPayments();
    if (result.success) {
      return result.data;
    }
    return [];
  };

  checkLogin = async () => {
    const result = await authAPI.checkLogin();
    return result.success;
  };

  githubLogin = async (code) => {
    const result = await authAPI.githubAuth(code);
    return result.success;
  };

  getGithubLoginURL = async () => {
    const result = await authAPI.getGithubAuthURL();
    this.observer.notify(notifyTypes.FETCHED_GITHUB_AUTH_URL, result);
  };

  login = async ({ nickname, password }) => {
    const result = await authAPI.loginAPI({ nickname, password });
    if (result.success) {
      this.isLogin = true;
      this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
    }
    return result;
  };

  logout = () => {
    authAPI.logout();
    this.isLogin = false;
    this.observer.notify(notifyTypes.INIT_USER);
  };

  register = async ({ nickname, password }) => {
    const result = await authAPI.registerAPI({ nickname, password });
    return result;
  };

  getIsLogin = () => {
    return this.isLogin;
  };

  getPayments = () => {
    return this.payments;
  };

  setPayments = async () => {
    const result = await this._fetchPayments();
    this.payments = result;
  };

  addPayment = async (name) => {
    const result = await paymentAPI.addPayment(name);
    await this.setPayments();
    this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
    return result;
  };

  deletePayment = async (paymentId) => {
    const result = await paymentAPI.deletePayment(paymentId);
    await this.setPayments();
    this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
    return result;
  };

  updatePayment = async ({ paymentId, name }) => {
    const result = await paymentAPI.updatePayment({ paymentId, name });
    await this.setPayments();
    this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
    return result;
  };
}

export default new UserModel();
