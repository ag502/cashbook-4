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

export const getCategoryString = (category) => {
  const categories = [
    { name: '월급', color: '#6ed5eb' },
    { name: '용돈', color: '#4cb8b8' },
    { name: '기타수입', color: '#94d3cc' },
    { name: '생활', color: '#4ca1de' },
    { name: '식비', color: '#d092e2' },
    { name: '교통', color: '#817dce' },
    { name: '쇼핑/뷰티', color: '#4a6cc3' },
    { name: '의료/건강', color: '#b9d58' },
    { name: '문화/여가', color: '#e6d267' },
    { name: '미분류', color: '#e2b765' },
  ];
  return categories[Number(category) - 1];
};
