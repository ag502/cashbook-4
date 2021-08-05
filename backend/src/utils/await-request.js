import request from 'request';

const awaitReqeust = async (options) =>
  new Promise((resolve, reject) => {
    request(options, (error, response, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });

export default awaitReqeust;
