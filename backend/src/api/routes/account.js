import { Router } from 'express';

const data = [
  {
    category: 9,
    paymentMethod: '현대카드',
    content: '스트리밍서비스 정기 결제',
    price: -10900,
    date: new Date('2021/08/11'),
  },
  {
    category: 6,
    paymentMethod: '현대카드',
    content: '후불 교통비 결제',
    price: -45340,
    date: new Date('2021/08/11'),
  },
  {
    category: 10,
    paymentMethod: '미분류',
    content: '온라인 세미나 신청',
    price: -10000,
    date: new Date('2021/08/13'),
  },
  {
    category: 5,
    paymentMethod: '롯데카드',
    content: '잔치국수와 김밥',
    price: -9500,
    date: new Date('2021/08/9'),
  },
  {
    category: 5,
    paymentMethod: '롯데카드',
    content: '국밥',
    price: -9500,
    date: new Date('2021/08/9'),
  },
  {
    category: 1,
    paymentMethod: '삼성카드',
    content: '7월 급여',
    price: 1822480,
    date: new Date('2021/08/19'),
  },
  {
    category: 5,
    paymentMethod: '롯데카드',
    content: '카레',
    price: -10000,
    date: new Date('2021/08/19'),
  },
  {
    category: 10,
    paymentMethod: '현금',
    content: '출력소(컬러인쇄)',
    price: -200,
    date: new Date('2021/08/4'),
  },
  {
    category: 5,
    paymentMethod: '현대카드',
    content: '토마토 소스 오므라이스',
    price: -6500,
    date: new Date('2021/08/4'),
  },
];

const yearExpenditureByCateogry = {
  1: {
    1: 3000,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 0,
    12: 12324,
  },
  2: {
    1: 5000,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 99999,
    9: 0,
    10: 87890,
    11: 0,
    12: 12324,
  },
  3: {
    1: 0,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 3234,
    9: 19090,
    10: 87890,
    11: 0,
    12: 0,
  },
  4: {
    1: 3000,
    2: 1200,
    3: 34890,
    4: 13220,
    5: 99999,
    6: 0,
    7: 39800,
    8: 89399,
    9: 19090,
    10: 87890,
    11: 0,
    12: 12324,
  },
  5: {
    1: 49022,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 129099,
    6: 0,
    7: 0,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 0,
    12: 0,
  },
  6: {
    1: 3000,
    2: 12300,
    3: 34890,
    4: 87813,
    5: 0,
    6: 0,
    7: 29800,
    8: 99999,
    9: 49090,
    10: 0,
    11: 0,
    12: 12324,
  },
  7: {
    1: 12320,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 23843,
    6: 90231,
    7: 39800,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 77777,
    12: 12324,
  },
  8: {
    1: 89212,
    2: 0,
    3: 34890,
    4: 43220,
    5: 0,
    6: 0,
    7: 39800,
    8: 99999,
    9: 0,
    10: 87890,
    11: 0,
    12: 12324,
  },
  9: {
    1: 47213,
    2: 12300,
    3: 12321,
    4: 43220,
    5: 0,
    6: 0,
    7: 0,
    8: 99999,
    9: 12314,
    10: 87890,
    11: 0,
    12: 12324,
  },
  10: {
    1: 12390,
    2: 12300,
    3: 34890,
    4: 43220,
    5: 0,
    6: 12314,
    7: 39800,
    8: 99999,
    9: 19090,
    10: 87890,
    11: 89123,
    12: 12324,
  },
};

export default (app) => {
  const routes = Router();
  app.use('/account', routes);

  // TODO: authMiddleware 추가
  routes.get('/', async (req, res) => {
    // TODO: month에따라 account 반환
    res.json(data);
  });

  routes.get('/category-year-expenditure/:id', async (req, res) => {
    const { id } = req.params;
    res.json(yearExpenditureByCateogry[id]);
  });

  routes.post('/', async (req, res) => {
    //TODO: account 등록
  });

  routes.put('/:accountId', async (req, res) => {
    //TODO: account 수정
  });

  routes.delete('/:accountId', async (req, res) => {
    //TODO: account 삭제
  });
};
