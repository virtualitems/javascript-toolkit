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
const Fragment = React.Fragment;


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

const Context = React.createContext();

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

const NavAnchor = function({ href, text }) {
  return ce('a', { href }, text);
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


// ----------------------------------------
// Composites
// ----------------------------------------

const Header = function() {

  const anchors = [
    ce(NavAnchor, { href: '#', text: 'Home', key: 'Home' }),
    ce(NavAnchor, { href: '#', text: 'About', key: 'About' }),
    ce(NavAnchor, { href: '#', text: 'Contact', key: 'Contact' }),
  ];

  const navbar = ce(Navbar, null, anchors);

  return ce('header', null, navbar);
};

const Main = function() {
  return ce('main', null, 'Main');
};

const Footer = function() {

  const props = {
    className: 'footer',
  };

  return ce('footer', props, 'Footer');
};

const Aside = function() {
  return ce('aside', null, 'Aside');
};


// ----------------------------------------
// Layouts
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
    ce(React.StrictMode, null,
      ce(ContextProvider, null,
        ce(View),
      ),
    ),
  );


})(window, document);
