import * as Router from 'https://esm.sh/@remix-run/router';

const $root = document.getElementById('root');

const { createRouter, createHashHistory } = Router;

const routes = [
  {
    id: 'home',
    path: '/',
    loader: () => {
      $root.innerHTML = '<h1>Home</h1>';
    },
  },
  {
    id: 'about',
    path: '/about',
    loader: () => {
      $root.innerHTML = '<h1>About</h1>';
    },
  },
  {
    id: 'greet',
    path: '/greet/:name',
    loader: ({ params }) => {
      console.log(params)
      $root.innerHTML = `<h1>Greetings, ${params['name']}</h1>`;
    },
  },
];

const router = createRouter({
  routes,
  history: createHashHistory(),
});

router.initialize();
