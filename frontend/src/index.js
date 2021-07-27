import MainPage from '@/views/pages/mainPage';

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
  $app.appendChild($page);
};

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);
