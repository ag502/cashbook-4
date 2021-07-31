import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import env from '../config/env';

export default ({ app }) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('jwt-secret', env.JWT_SECRET);
  app.use(morgan('combined'));

  app.use(env.API_PREFIX);
};
