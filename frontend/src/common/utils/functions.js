export const appendZero = (number) => {
  const curNumber = parseInt(number);
  return curNumber < 10 ? `0${curNumber}` : `${curNumber}`;
};

export const checkUndefined = (value, replaceValue, returnValue = null) => {
  return !value ? replaceValue : !returnValue ? value : returnValue;
};

export const parsingDate = (date) => {
  const curDate = new Date(date);
  return `${curDate.getFullYear()}${appendZero(
    curDate.getMonth() + 1
  )}${appendZero(curDate.getDate())}`;
};
