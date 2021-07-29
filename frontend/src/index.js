import MainPage from '@/views/pages/mainPage';
import CalenderPage from './views/pages/calenderPage';

import observer from '@/common/utils/observer';

import '@/common/styles/normalize.css';
import '@/common/styles/global.css';
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
