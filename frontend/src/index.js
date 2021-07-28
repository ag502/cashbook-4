import MainPage from '@/views/pages/mainPage';

import '@/common/styles/normalize.css';
import '@/common/styles/global.css';

const $app = document.querySelector('#app');

const routes = {
  '': new MainPage(),
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
  // $app.appendChild($page);
  $app.innerHTML = `<main-header></main-header>`;
};

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);
