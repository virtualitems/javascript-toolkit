import { createElement, useState } from 'https://esm.sh/react@19?dev';
import { hydrateRoot } from 'https://esm.sh/react-dom@19/client?dev';

const rootElement = document.getElementById('root');

hydrateRoot(rootElement, createElement(Counter));

function Counter() {

  const [count, setCount] = useState(0);
  const onClick = () => setCount(prev => prev + 1);

  return createElement(
    'div',
    null,
    createElement('button', { onClick }, 'Click me!'),
    createElement('span', null, ` Count: ${count}`),
  );
}
