export const appendZero = (number) => {
  const curNumber = parseInt(number);
  return curNumber < 10 ? `0${curNumber}` : `${curNumber}`;
};

export const checkUndefined = (value, replaceValue, returnValue = null) => {
  return !value ? replaceValue : !returnValue ? value : returnValue;
};

export const parsingDate = (date, type = 'calender') => {
  const curDate = new Date(date);
  if (type === 'calender') {
    return `${curDate.getFullYear()}${appendZero(
      curDate.getMonth() + 1
    )}${appendZero(curDate.getDate())}`;
  } else if (type === 'account') {
    return `${curDate.getMonth() + 1}월 ${curDate.getDate()}일`;
  }
};
