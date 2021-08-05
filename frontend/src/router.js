const router = (routes, $app) => {
  const $page = routes[window.location.pathname];
  window.onpopstate = () => render($app, $page);
  render($app, $page);
};

const render = ($app, $page) => {
  $app.innerHTML = '';
  $app.appendChild($page);
};
export default router;
