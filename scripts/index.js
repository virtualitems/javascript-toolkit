(function(window, document) {
'use strict';

// ----------------------------------------
// Checks
// ----------------------------------------

if (!window.React) {
  console.error('React is not loaded');
  return;
}

if (!window.ReactDOM) {
  console.error('ReactDOM is not loaded');
  return;
}


// ----------------------------------------
// Globals
// ----------------------------------------

const React = window.React;
const ReactDOM = window.ReactDOM;

const ce = React.createElement;
const createContext = React.createContext;

const Fragment = React.Fragment;
const StrictMode = React.StrictMode;


// ----------------------------------------
// Errors
// ----------------------------------------



// ----------------------------------------
// Utils
// ----------------------------------------



// ----------------------------------------
// Hooks
// ----------------------------------------



// ----------------------------------------
// Context
// ----------------------------------------

const Context = createContext();

const ContextProvider = function({ children }) {

  const value = {};

  return ce(Context.Provider, { value }, children);
};


// ----------------------------------------
// Models
// ----------------------------------------



// ----------------------------------------
// Contents
// ----------------------------------------

const NavAnchor = function({ href, target, text }) {
  return ce('a', { href, target }, text);
};


// ----------------------------------------
// Containers
// ----------------------------------------

const Navbar = function({ children }) {

  const props = {
    className: 'navbar',
  };

  return ce('nav', props, children);
};

const Row = function({ children }) {

  const props = {
    className: 'row',
  };

  return ce('div', props, children);
};

const Col = function({ children, width }) {

  const props = {
    className: `col-${width}`,
  };

  return ce('div', props, children);
};


// ----------------------------------------
// Composites
// ----------------------------------------

const Header = function() {

  const anchors = [
    ce(NavAnchor, { key: 'website', target: '_blank', href: 'https://alejandrocr.co/', text: 'Website' }),
    ce(NavAnchor, { key: 'github', target: '_blank', href: 'https://github.com/virtualitems/', text: 'Github' }),
  ];

  const navbar = ce(Navbar, null, anchors);

  return ce('header', null, navbar);
};

const Main = function() {

  const col1 = ce(Col, { width: 4 }, 'Col 1');
  const col2 = ce(Col, { width: 4 }, 'Col 2');
  const col3 = ce(Col, { width: 4 }, 'Col 3');

  const row = ce(Row, null, col1, col2, col3);

  return ce('main', null, row);
};

const Footer = function() {

  const props = {
    className: 'footer',
  };

  return ce('footer', props, 'Copyright (c) Virtual Items 2023');
};

const Aside = function() {
  return ce('aside', null, 'Aside');
};


// ----------------------------------------
// Layout
// ----------------------------------------

const BorderBoxLayout = function({ top, left, center, right, bottom }) {

  const visibleComponents = [];

  if (top?.component && top?.visible !== false)
    visibleComponents.push(top.component);

  if (left?.component && left?.visible !== false)
    visibleComponents.push(left.component);

  if (center?.component && center?.visible !== false)
    visibleComponents.push(center.component);

  if (right?.component && right?.visible !== false)
    visibleComponents.push(right.component);

  if (bottom?.component && bottom?.visible !== false)
    visibleComponents.push(bottom.component);

  return ce.apply(null, [Fragment, null].concat(visibleComponents));

};


// ----------------------------------------
// View
// ----------------------------------------
const View = function() {

  const header = ce(Header);
  const main = ce(Main);
  const footer = ce(Footer);
  const aside = ce(Aside);

  const layoutProps = {
    top: {
      component: header,
    },
    left: {
      component: aside,
      visible: false,
    },
    center: {
      component: main,
    },
    right: {
      component: aside,
      visible: false,
    },
    bottom: {
      component: footer,
    },
  };

  const layout = ce(BorderBoxLayout, layoutProps);

  return ce(Fragment, null, layout);
}


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    ce(StrictMode, null,
      ce(ContextProvider, null,
        ce(View),
      ),
    ),
  );


})(window, document);
