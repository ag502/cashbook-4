import express from 'express';
import env from './config/env.js';
import loader from './loader/index.js';
const app = express();

const loadSettings = async () => {
  await loader({ expressApp: app });
};

loadSettings();

app.listen(env.PORT, () => {
  console.log(`server is running at ${env.PORT}`);
});
