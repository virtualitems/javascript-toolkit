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

const ContextProvider = function(props) {

  return ce(Context.Provider, { value: {} }, props.children);
};


// ----------------------------------------
// Models
// ----------------------------------------



// ----------------------------------------
// Contents
// ----------------------------------------



// ----------------------------------------
// Containers
// ----------------------------------------



// ----------------------------------------
// Composites
// ----------------------------------------

const Header = function(props) {
  return ce('header', null, 'Header');
};

const Main = function(props) {
  return ce('main', null, 'Main');
};

const Footer = function(props) {
  return ce('footer', null, 'Footer');
};

const Aside = function(props) {
  return ce('aside', null, 'Aside');
};


// ----------------------------------------
// Layouts
// ----------------------------------------

const HeaderMainFooterAsidesLayout = function(props) {

  if (!props?.top?.component)
    throw new Error('top component is required');

  if (!props?.left?.component)
    throw new Error('left component is required');

  if (!props?.center?.component)
    throw new Error('center component is required');

  if (!props?.right?.component)
    throw new Error('right component is required');

  if (!props?.bottom?.component)
    throw new Error('bottom component is required');

  const visibleComponents = [];

  if (props?.top?.visible !== false)
    visibleComponents.push(props.top.component);

  if (props?.left?.visible !== false)
    visibleComponents.push(props.left.component);

  if (props?.center?.visible !== false)
    visibleComponents.push(props.center.component);

  if (props?.right?.visible !== false)
    visibleComponents.push(props.right.component);

  if (props?.bottom?.visible !== false)
    visibleComponents.push(props.bottom.component);

  return ce.apply(null, [Fragment, null].concat(visibleComponents));

};


// ----------------------------------------
// View
// ----------------------------------------
const View = function(props) {

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
    },
    center: {
      component: main,
    },
    right: {
      component: aside,
    },
    bottom: {
      component: footer,
    },
  };

  const layout = ce(HeaderMainFooterAsidesLayout, layoutProps);

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
