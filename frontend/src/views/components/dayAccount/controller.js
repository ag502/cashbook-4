import BaseController from '@/common/utils/baseController';
import errorTypes from '@/common/utils/error';

class AccountController extends BaseController {
  constructor() {
    super();
  }

  deleteAccount = async (id) => {
    const result = await this.cashBookModel.deleteAccountData(id);
    if (!result.success) {
      const { error } = result;
      if (error.errorType === errorTypes.NotExist) {
        return { success: false, message: '이미 삭제된 데이터 입니다' };
      } else {
        return { success: false, message: '예기치 못한 에러가 발생했습니다.' };
      }
    }
    return { ...result, message: '삭제되었습니다.' };
  };
}

export default new AccountController();
