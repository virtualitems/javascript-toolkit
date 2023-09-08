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

const {
  React,
  ReactBootstrap,
  ReactDOM,
  ReactTransitionGroup,

} = window;

const {
  createElement: ce,
  Fragment,
  StrictMode,
  useRef,
  useState,

} = React;

const {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,

} = ReactBootstrap;

const {
  CSSTransition,

} = ReactTransitionGroup;


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



// ----------------------------------------
// Models
// ----------------------------------------



// ----------------------------------------
// Contents
// ----------------------------------------



// ----------------------------------------
// Containers
// ----------------------------------------

const CSSTransitionExample = function() {

  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);

  return (
    ce(Container, { style: { paddingTop: '2rem' } },
      showButton && (
        ce(Button, {
          onClick: () => setShowMessage(true),
          size: 'lg',
        }, 'Show Message')
      ),
      ce(CSSTransition, {
        in: showMessage,
        nodeRef: nodeRef,
        timeout: 300,
        classNames: 'alert',
        unmountOnExit: true,
        onEnter: () => setShowButton(false),
        onExited: () => setShowButton(true),
      },
        ce(Alert, {
          ref: nodeRef,
          variant: 'primary',
          dismissible: true,
          onClose: () => setShowMessage(false),
        },
          ce(Alert.Heading, null, 'Animated alert message'),
          ce('p', null, 'This alert message is being transitioned in and out of the DOM.'),
          ce(Button, {
            variant: 'primary',
            onClick: () => setShowMessage(false),
          }, 'Close')
        )
      )
    )
  );
};


const ModalExample = function() {
  const [modalShow, setModalShow] = React.useState(false);

  const modal = (
    ce(Modal, {
      show: modalShow,
      size: 'lg',
      centered: true,
      animation: true,
    },
      ce(Modal.Header, { closeButton: true },
        ce(Modal.Title, { id: 'contained-modal-title-vcenter' }, 'Modal heading')
      ),
      ce(Modal.Body, null,
        ce('h4', null, 'Centered Modal'),
        ce('p', null, 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.')
      ),
      ce(Modal.Footer, null,
        ce(Button, { onClick: () => setModalShow(false) }, 'Close')
      )
    )
  );

  const button = (
    ce(Button, {
      variant: 'primary',
      onClick: () => setModalShow(true),
    }, 'Launch vertically centered modal')
  );

  return (
    ce(Container, { style: { paddingTop: '2rem' } },
      button,
      modal
    )
  );

};

// ----------------------------------------
// Composites
// ----------------------------------------



// ----------------------------------------
// Layout
// ----------------------------------------

const Layout = function() {
  return ce(Container, null, ce(CSSTransitionExample), ce(ModalExample));
};


// ----------------------------------------
// View
// ----------------------------------------

const View = function() {
  return ce(Fragment, null, ce(Layout));
};


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(ce(StrictMode, null, ce(View)));


})(window, document);
