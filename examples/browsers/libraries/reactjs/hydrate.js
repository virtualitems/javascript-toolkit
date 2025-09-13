import React from 'https://esm.sh/react@19?dev';
import ReactDOM from 'https://esm.sh/react-dom@19/client?dev';

const widgets = import('./hydrate-widgets.js');

const mounts = [
  {
    target: document.getElementById('react-button'),
    component: React.lazy(() => widgets.then(w => ({ default: w.Button }))),
    prefix: 'btn-',
    props: null,
  },
  {
    target: document.getElementById('react-table'),
    component: React.lazy(() => widgets.then(w => ({ default: w.Table }))),
    prefix: 'tbl-',
    props: {
      users: JSON.parse(document.getElementById('users-data').textContent),
    },
  },
];

for (const mount of mounts) {
  const { target, component, prefix, props } = mount;

  if (target instanceof HTMLElement === false) {
    console.warn('Mount target is not an HTMLElement:', target);
    continue;
  }
  if (component === undefined) {
    console.warn('Component is not defined for mount:', { target, component, prefix });
    continue;
  }
  if (prefix === undefined) {
    console.warn('Prefix is not defined for mount:', { target, component, prefix });
    continue;
  }

  ReactDOM.hydrateRoot(target, React.createElement(component, props), {
    identifierPrefix: prefix,
  });
}
