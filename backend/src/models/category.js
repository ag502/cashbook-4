import DataTypes from 'sequelize';

const category = (sequelize) => {
  const category = sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
    },
    { tableName: 'category' }
  );

  return category;
};

export default category;
