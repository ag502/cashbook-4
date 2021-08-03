import errorTypes from '@/common/utils/error';

class CommonAPI {
  constructor() {
    this.baseURL = 'http://localhost:3000';
    this.abortController = new AbortController();
  }
  beforeRequest = async (cb) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      await cb();
      return;
    }

    const newAccessTokenResult = await this.getNewAccessToken();
  };

  getNewAccessToken = async () => {};
  getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
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
