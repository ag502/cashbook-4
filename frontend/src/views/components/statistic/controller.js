import BaseController from '@/common/utils/baseController';

class ChartController extends BaseController {
  constructor() {
    super();
  }

  _getExpenditurePercentage = (total, accountsInfo) => {
    Object.keys(accountsInfo).forEach((categoryId) => {
      const curPrice = accountsInfo[categoryId].price;
      accountsInfo[categoryId].percentage = (curPrice / total) * 100;
    });

    const diff =
      100 -
      Object.entries(accountsInfo).reduce(
        (acc, [_, { percentage }]) => acc + Math.floor(percentage),
        0
      );

    return Object.entries(accountsInfo)
      .sort((a, b) => {
        const aDecimal = a[1].percentage - Math.floor(a[1].percentage);
        const bDecimal = b[1].percentage - Math.floor(b[1].percentage);
        return bDecimal - aDecimal;
      })
      .map(([categoryId, { price, percentage }], idx) => {
        return {
          categoryId,
          price,
          percent:
            idx < diff ? Math.floor(percentage) + 1 : Math.floor(percentage),
        };
      });
  };

  _getMonthExpenditurByCateogroy = () => {
    const accountsByCategory = {};
    let totalExpenditure = 0;

    this.cashBookModel.getAccounts().forEach(({ category, price }) => {
      if (price < 0) {
        totalExpenditure += -price;
        accountsByCategory[category] = accountsByCategory[category] || {
          price: 0,
        };
        accountsByCategory[category].price += -price;
      }
    });
    return [totalExpenditure, accountsByCategory];
  };

  getPieCharData = () => {
    const [totalExpenditure, accountsByCategory] =
      this._getMonthExpenditurByCateogroy();

    return [
      totalExpenditure,
      this._getExpenditurePercentage(totalExpenditure, accountsByCategory),
    ];
  };
}

export default new ChartController();
