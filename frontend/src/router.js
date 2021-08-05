import ScreenSaver from '@/views/components/screenSaver';

const router = (routes, $app) => {
  const $page = routes[window.location.pathname];
  window.onpopstate = () => render($app, $page);
  render($app, $page);
};

const render = ($app, $page) => {
  $app.innerHTML = '';
  $app.appendChild($page);
  $app.appendChild(new ScreenSaver($app));
};
export default router;
