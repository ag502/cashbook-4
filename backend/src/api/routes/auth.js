import { Router } from 'express';

export default (app) => {
  const routes = Router();
  app.use('/auth', routes);

  routes.get('/check', async (req, res) => {
    // TEST
    console.log('asdasdsdadsad');
    res.json({ success: true });
  });
  routes.post('/login', async (req, res) => {});
  routes.post('/register', async (req, res) => {});

  routes.get('/oauth-github', async (req, res) => {});
};
