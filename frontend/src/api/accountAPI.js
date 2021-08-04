import CommonAPI from './commonAPI';

class AccountAPI extends CommonAPI {
  constructor() {
    super();
  }

  getAccountByMonth = async () => {
    const accessToken = this.getAccessToken();

    const path = '/api/account/';
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
}

export default new AccountAPI();
