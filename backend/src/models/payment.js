import DataTypes from 'sequelize';

const payment = (sequelize) => {
  const payment = sequelize.define(
    'payment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      // FK
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'payment',
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'name'],
        },
      ],
    }
  );

  return payment;
};

export default payment;
