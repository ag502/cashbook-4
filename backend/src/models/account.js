import DataTypes from 'sequelize';

const account = (sequelize) => {
  const account = sequelize.define(
    'account',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(16, 0),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      // FK
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payment_id: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
    },
    { tableName: 'account' }
  );
  return account;
};

export default account;
