export const appendZero = (number) => {
  const curNumber = parseInt(number);
  return curNumber < 10 ? `0${curNumber}` : `${curNumber}`;
};

export const checkUndefined = (value, replaceValue, returnValue = null) => {
  return !value ? replaceValue : !returnValue ? value : returnValue;
};
