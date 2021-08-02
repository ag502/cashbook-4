import { messages } from '../errors/index.js';

const getError = (errorType) => {
  const message = messages[errorType];
  return { errorType, message };
};
export default getError;
