import CommonAPI from './commonAPI';

class AccountAPI extends CommonAPI {
  constructor() {
    super();
  }

  getAccountByMonth = async (date) => {
    const accessToken = this.getAccessToken();

    const path = `/api/account/${date}`;
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

  getYearAccountByCategory = async (date, categoryId) => {
    const accessToken = this.getAccessToken();

    const path = `/api/account/category-year-expenditure/${date}/${categoryId}`;
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
