import expressLoader from './express.js';
import sequelizeLoader from './sequelize.js';

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  await sequelizeLoader();
};
