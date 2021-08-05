import MainPage from '@/views/pages/mainPage';
import CalenderPage from '@/views/pages/calenderPage';
import StatisticPage from '@/views/pages/statisticPage';

import $ from '@/common/utils/domController';

import '@/common/styles/normalize.css';
import '@/common/styles/global.css';

import observer from '@/common/utils/observer';
import notifyTypes from './common/utils/notifyTypes';

import Auth from '@/views/components/auth';

import BaseController from './common/utils/baseController';

import router from './router';

const $app = document.querySelector('#app');

const routes = {
  '/': new MainPage(),
  '/calender': new CalenderPage(),
  '/chart': new StatisticPage(),
};

const historyRouterPush = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  router(routes, $app);
};

$app.addEventListener('click', (evt) => {
  const pathName = evt.target.getAttribute('route');
  if (pathName) {
    historyRouterPush(pathName);
  }
});

router(routes, $app);

const handleInitUser = (isLogin) => {
  if (isLogin) {
    return;
  }
  const $app = document.querySelector('#app');
  const $auth = new Auth();
  $app.appendChild($auth);
};
observer.subscribe(notifyTypes.INIT_USER, $app, handleInitUser);

window.addEventListener('popstate', () => {
  router(routes, $app);
});

router(routes, $app);
