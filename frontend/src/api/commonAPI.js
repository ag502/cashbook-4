import errorTypes from '@/common/utils/error';

class CommonAPI {
  constructor() {
    this.baseURL = 'https://api.woowahan.club:3000';
    this.abortController = new AbortController();
  }

  getNewAccessToken = async () => {};

  getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
  };

  parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  request = async ({ path, options }) => {
    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        ...options,
        signal: this.abortController.signal,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return {
        success: false,
        error: { errorType: errorTypes.UnexpectError },
      };
    }
  };
}

export default CommonAPI;
