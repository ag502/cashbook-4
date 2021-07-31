import MainPage from '@/views/pages/mainPage';
import CalenderPage from './views/pages/calenderPage';

import Login from '@/views/components/login';

import observer from '@/common/utils/observer';

import '@/common/styles/normalize.css';
import '@/common/styles/global.css';

import $ from '@/common/utils/domController';
import notifyTypes from './common/utils/notifyTypes';

const $app = document.querySelector('#app');

const routes = {
  '': new MainPage(),
  '/calender': new CalenderPage(),
  '/chart': new MainPage(),
};

const render = () => {
  const hash = location.hash.replace('#', '');
  const $page = routes[hash];
  if (!$page) {
    // TODO: 404 페이지
    location.hash = '';
    return;
  }

  $app.innerHTML = '';
  $app.appendChild($page);
};

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);

const handleInitUser = (isLogin) => {
  if (isLogin) {
    return;
  }
  const $app = document.querySelector('#app');
  const $login = new Login();
  $app.appendChild($login);
};
observer.subscribe(notifyTypes.INIT_USER, $app, handleInitUser);
