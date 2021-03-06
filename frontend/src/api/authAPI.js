import CommonAPI from './commonAPI.js';

class AuthAPI extends CommonAPI {
  constructor() {
    super();
  }

  checkLogin = async () => {
    const accessToken = this.getAccessToken();

    const path = '/api/auth/check';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };
    const result = await this.request({ path, options });
    return result;
  };

  loginAPI = async ({ nickname, password }) => {
    const path = '/api/auth/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, password }),
    };
    const result = await this.request({ path, options });
    if (!result.success) {
      return result;
    }
    this.setAccessToken(result.accessToken);
    return { success: result.success };
  };

  registerAPI = async ({ nickname, password }) => {
    const path = '/api/auth/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, password }),
    };
    const result = await this.request({ path, options });
    return result;
  };

  logout = () => {
    this.setAccessToken();
  };

  getGithubAuthURL = async () => {
    const path = '/api/auth/github';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await this.request({ path, options });
    return result;
  };
  githubAuth = async (code) => {
    const path = '/api/auth/github';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    };
    const result = await this.request({ path, options });
    if (result.success) {
      this.setAccessToken(result.accessToken);
    }
    return result;
  };
}

export default new AuthAPI();
