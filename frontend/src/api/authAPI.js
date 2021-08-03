import CommonAPI from './commonAPI.js';

class AuthAPI extends CommonAPI {
  constructor() {
    super();
  }

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
}

export default new AuthAPI();
