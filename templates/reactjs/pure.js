import { createElement as h, useEffect, useState } from 'https://esm.sh/react@19';
import { createRoot } from 'https://esm.sh/react-dom@19/client';
import { create } from 'https://esm.sh/zustand';

/* External */
function setDocumentTitle(title) {
  document.title = title;
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/* Storage */
const themeStore = create((set) => ({
  theme: 'light',
  setLightTheme: () => set({ theme: 'light' }),
  setDarkTheme: () => set({ theme: 'dark' }),
  toggle: () => set((state) => (
    { theme: (state.theme === 'light' ? 'dark' : 'light') }
  )),
}));

/* Hooks */
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prev) => {
      const next = prev + 1;

      if (next >= 10) {
        return 0;
      }

      return next;
    });
  }

  return { count, increment };
}

/* Components */
function Container() {
  const { count, increment } = useCounter(0);
  const { theme, toggle } = themeStore();

  useEffect(() => {
    setDocumentTitle(`Count: ${count}`);
  }, [count]);

  const counterBtn = h(Button, { className: cn('counter-btn', theme), onClick: increment }, count);

  const themeBtn = h(Button, { className: cn('theme-btn', theme), onClick: toggle }, 'Change Theme');

  return h('main', null, counterBtn, themeBtn);
}

function Button(props) {
  return h('button', props);
}

/* Styles */
const sheet = new CSSStyleSheet();

sheet.replace(`
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  min-width: 100px;
  user-select: none;
}

button.light {
  background-color: lightblue;
  color: black;
}

button.dark {
  background-color: darkblue;
  color: white;
}
`);

document.adoptedStyleSheets.push(sheet);

/* Render */
createRoot(document.getElementById('root')).render(h(Container));
