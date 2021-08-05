import CommonAPI from './commonAPI';

class AccountAPI extends CommonAPI {
  constructor() {
    super();
  }

  addAccount = async (data) => {
    const accessToken = this.getAccessToken();
    const path = '/api/account';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };
    const result = await this.request({ path, options });
    return result;
  };

  editAccount = async (data) => {
    const { id, ...rest } = data;
    const accessToken = this.getAccessToken();
    const path = `/api/account/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(rest),
    };
    const result = await this.request({ path, options });
    return result;
  };

  deleteAccount = async (accountId) => {
    const accessToken = this.getAccessToken();
    const path = `/api/account/${accountId}`;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const result = await this.request({ path, options });
    return result;
  };

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
