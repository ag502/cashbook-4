import { Sequelize } from 'sequelize';

import userModel from './user.js';
import accountModel from './account.js';
import paymentModel from './payment.js';
import categoryModel from './category.js';

import dbEnv from '../config/db-env.js';

const MYSQL = 'mysql';

const sequelize = new Sequelize(
  dbEnv.DB_NAME,
  dbEnv.DB_USER,
  dbEnv.DB_PASSWORD,
  {
    host: dbEnv.DB_HOST,
    dialect: MYSQL,
    logging: false,
  }
);

const user = userModel(sequelize);
const account = accountModel(sequelize);
const payment = paymentModel(sequelize);
const category = categoryModel(sequelize);

user.hasMany(account, { foreignKey: 'user_id', sourceKey: 'id' });
account.belongsTo(user, { foreignKey: 'user_id', targetKey: 'id' });

user.hasMany(payment, { foreignKey: 'user_id', sourceKey: 'id' });
payment.belongsTo(user, { foreignKey: 'user_id', targetKey: 'id' });

category.hasMany(account, {
  foreignKey: 'category_id',
  sourceKey: 'id',
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
});
account.belongsTo(category, { foreignKey: 'category_id', targetKey: 'id' });

payment.hasMany(account, {
  foreignKey: 'payment_id',
  sourceKey: 'id',
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
});

account.belongsTo(payment, { foreignKey: 'payment_id', targetKey: 'id' });

export default sequelize;
