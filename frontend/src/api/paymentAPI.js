import CommonAPI from './commonAPI.js';

class PaymentAPI extends CommonAPI {
  constructor() {
    super();
  }
  getPayments = async () => {
    const accessToken = this.getAccessToken();

    const path = '/api/payment';
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

  addPayment = async (name) => {
    const accessToken = this.getAccessToken();
    const path = '/api/payment';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ name }),
    };
    const result = await this.request({ path, options });
    return result;
  };
}

export default new PaymentAPI();
