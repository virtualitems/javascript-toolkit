/**
 * @requires React
 * @requires React-DOM
 * @requires Bootstrap 5
 *
 * @see https://react.dev/
 *
 * @param {string} rid - Root ID.
 * @param {object} window - Window object.
 * @param {object} document - Document object.
 */
(function(rid, window) {
'use strict';

/*
ARQUITECTURA DE COMPONENTES

Wrappers: Envolventes que agregan funcionalidad a la aplicación
  View: Representa la página de la SPA
    Layout: Especificación de la estructura de la página
      Containers: Contenedores de componentes (ej: <div>)
      Contents: Componentes de contenido (ej: <p>)
    Composites: Conjunto de componentes que se incrusta en un espacio del layout
*/

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
  document,
  React,
  ReactDOM,

} = window;

const {
  createElement: ce,
  Fragment,
  StrictMode,

} = React;

const {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,

} = ReactBootstrap;

const nbsp = '\u00A0';

const root = document.getElementById(rid);

const shadowRoot = root.attachShadow({mode: 'open'});


// ----------------------------------------
// Errors
// ----------------------------------------



// ----------------------------------------
// Utils
// ----------------------------------------

const icon = function(className) {
  return ce('i', { className });
};


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

const iconButton = function({ iconName, ...props }) {
  return ce(Button, props, icon(iconName));
};


const blockButton = function({children, ...props}) {
  return ce('div', { className: 'd-grid gap-2' }, ce(Button, props, children));
};



// ----------------------------------------
// Containers
// ----------------------------------------

const OpcionPreguntaSeleccion = function() {

  const campoDescripcion = ce(Form.Control, {
    type: 'text',
    placeholder: 'Descripción',
  });

  const campoCorrecta = ce(Form.Check, {
    type: 'checkbox',
    label: '¿Es correcta?',
  });

  const btnEliminar = ce(iconButton, { iconName: 'fa fa-trash', variant: 'danger' });

  const fila = ce(Row, null,
    ce(Col, null, campoDescripcion),
    ce(Col, null, campoCorrecta),
    ce(Col, null, btnEliminar),
  );

  return fila;
};


const PreguntaSeleccion = function() {

  // Columna izquierda

  const listaOpciones = [
    ce('div', { key: 1, className: 'mb-2' }, ce(OpcionPreguntaSeleccion)),
    ce('div', { key: 2, className: 'mb-2' }, ce(OpcionPreguntaSeleccion)),
    ce('div', { key: 3, className: 'mb-2' }, ce(OpcionPreguntaSeleccion)),
  ];

  const opciones = ce(Col, { xs: 12, className: 'mb-4' }, listaOpciones);
  const agregarOpcion = ce(Col, { xs: 12, className: 'mb-4' }, ce(blockButton, null, icon('fa fa-plus')));

  const columnaIzquierda = ce(Col, { xs: 10 }, ce(Row, null, opciones, agregarOpcion));

  // Columna derecha

  const btnEliminar = (
    ce(Col, null,
      ce(iconButton,
        {
          size: 'sm',
          iconName: 'fa fa-trash',
          variant: 'danger',
          style: {
            position: 'absolute',
            top: '0',
            right: '0',
          },
        }
      )
    )
  );

  const espacio = ce(Col, { xs: 12, className: 'mb-2' }, ce('div', null, nbsp));

  const puntaje = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Control, { type: 'number', placeholder: 'Puntaje' }));
  const requerido = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Check, { type: 'checkbox', label: '¿Requerida?', defaultChecked: true }));

  const columnaDerecha = ce(Col, { xs: 2 }, ce(Row, null, btnEliminar, espacio, puntaje, requerido));

  // conjunto

  const dobleColumna = ce(Row,
    {
      style: {
        position: 'relative',
      },
      className: 'px-2 py-3',
    },
    columnaIzquierda,
    columnaDerecha,
  );

  return dobleColumna;
};

/*
<Card>
<Card.Header>Featured</Card.Header>
<Card.Body>
  <Card.Title>Special title treatment</Card.Title>
  <Card.Text>
    With supporting text below as a natural lead-in to additional content.
  </Card.Text>
  <Button variant="primary">Go somewhere</Button>
</Card.Body>
</Card>
*/
// ----------------------------------------
// Composites
// ----------------------------------------



// ----------------------------------------
// Layout
// ----------------------------------------

const Layout = function() {
  const test = ce(PreguntaSeleccion,
    {
      //
    },
    'text content'
  );

  return ce(Fragment, null, test);
};


// ----------------------------------------
// View
// ----------------------------------------

const View = function() {
  return ce(Fragment, null, ce(Layout));
};


// ----------------------------------------
// External resources
// ----------------------------------------
let ext = null;

ext = document.createElement('link');
ext.rel = 'stylesheet';
ext.href = root.getAttribute('bootstrap-css');

shadowRoot.appendChild(ext);

ext = document.createElement('script');
ext.type = 'application/javascript';
ext.src = root.getAttribute('bootstrap-js');

shadowRoot.appendChild(ext);

ext = document.createElement('link');
ext.rel = 'stylesheet';
ext.href = root.getAttribute('custom-css');

shadowRoot.appendChild(ext);

ext = document.createElement('link');
ext.rel = 'stylesheet';
ext.href = root.getAttribute('font-awesome-css');

shadowRoot.appendChild(ext);


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(shadowRoot)
  .render(ce(StrictMode, null, ce(View)));


})('root', window);
