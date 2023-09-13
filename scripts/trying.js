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

const rootAttributes = {
  bootstrapCss: root.getAttribute('bootstrap-css'),
  bootstrapJs: root.getAttribute('bootstrap-js'),
  customCss: root.getAttribute('custom-css'),
  fontAwesomeCss: root.getAttribute('font-awesome-css'),
  tituloEvaluacion: root.getAttribute('titulo-evaluacion'),
};


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

const iconButton = function({ children, iconName, ...props }) {
  return ce(Button, props, icon(iconName), children);
};


const blockButton = function({children, ...props}) {
  return ce('div', { className: 'd-grid gap-2' }, ce(Button, props, children));
};



// ----------------------------------------
// Containers
// ----------------------------------------

const DosColumnas = function({ izquierda, derecha }) {

  const panel = ce(Row,
    {
      className: 'px-2 py-3 position-relative',
    },
    izquierda,
    derecha,
  );

  return panel;

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

/*



*/

const Modulo = function({ elementos = [] }) {

  const title = ce(Fragment, null,
    ce(Col, { xs: 3, className: 'mb-4' }, ce('span', { className: 'h3' }, 'Nombre del módulo:')),
    ce(Col, { xs: 9, className: 'mb-4' }, ce(Form.Control, { type: 'text' })),
  );

  const filasElementos = elementos.map((elemento, i) => ce(Col, { key: i, xs: 12, className: 'mb-3' }, elemento));

  const btnAgregarContenidos = ce(blockButton, { variant: 'primary', size: 'lg'}, icon('fa fa-plus'), ' Agregar contenidos');

  const btnAgregarCampos = ce(blockButton, { variant: 'primary', size: 'lg'}, icon('fa fa-plus'), ' Agregar preguntas');

  const botones = ce(Fragment, null,
    ce(Col, { xs: 6, className: 'mb-3' }, btnAgregarContenidos),
    ce(Col, { xs: 6, className: 'mb-3' }, btnAgregarCampos),
  );

  const panel = (
    ce(Card, null,
      ce(Card.Body, null,
        ce(Row, null,
          title,
          filasElementos,
          botones,
        )
      )
    )
  );

  return panel;

};


const OpcionPreguntaSeleccion = function() {

  const campoDescripcion = ce(Form.Control, {
    type: 'text',
    placeholder: 'Descripción',
  });

  const campoCorrecta = ce(Form.Check, {
    type: 'checkbox',
    label: '¿Es correcta?',
  });

  const btnEliminar = ce(iconButton, { iconName: 'fa fa-trash', variant: 'danger', size: 'sm' });

  const fila = ce(Row, null,
    ce(Col, null, campoDescripcion),
    ce(Col, null, campoCorrecta),
    ce(Col, null, btnEliminar),
  );

  return fila;
};


const PreguntaSeleccion = function({ opciones = [] }) {

  // Columna izquierda

  const listaOpcionesConLinea = opciones.map((opcion, i) => ce(Fragment, { key: i }, opcion, ce('hr')))

  const listaOpciones = ce(Col,
    {
      xs: 12,
      className: 'mb-4'
    },
    listaOpcionesConLinea
  );

  const agregarOpcion = ce(Col, { xs: 12, className: 'mb-4' }, ce(blockButton, null, icon('fa fa-plus')));

  const columnaIzquierda = ce(Col, { xs: 10 }, ce(Row, null, listaOpciones, agregarOpcion));

  // Columna derecha

  const eliminador = (
    ce(Col, null,
      ce(iconButton,
        {
          size: 'sm',
          iconName: 'fa fa-trash',
          variant: 'danger',
          className: 'position-absolute top-0 end-0',
        }
      )
    )
  );

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, nbsp));

  const puntaje = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Control, { type: 'number', placeholder: 'Puntaje' }));

  const requerido = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Check, { type: 'checkbox', label: '¿Requerida?', defaultChecked: true }));

  const columnaDerecha = ce(Col, { xs: 2 }, ce(Row, null, eliminador, espacio, puntaje, requerido));

  // conjunto

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const PreguntaTexto = function() {

  // Columna izquierda

  const descripcion = ce('p',
    {
      className: 'h-100 rounded p-4',
      style: {
        border: '1px solid #ced4da',
        backgroundColor: '#e9ecef',
      }
    },
    'Espacio reservado para un campo de texto'
  );
  // const descripcion = ce('p', null, ce(Form.Control, { as: 'textarea', type: 'text', placeholder: 'Campo de tipo texto', disabled: true, className: 'h-100' }));

  const columnaIzquierda = ce(Col, { xs: 10 }, descripcion);

  // Columna derecha

  const eliminador = (
    ce(Col, null,
      ce(iconButton,
        {
          size: 'sm',
          iconName: 'fa fa-trash',
          variant: 'danger',
          className: 'position-absolute top-0 end-0',
        }
      )
    )
  );

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, nbsp));

  const puntaje = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Control, { type: 'number', placeholder: 'Puntaje' }));

  const requerido = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Check, { type: 'checkbox', label: '¿Requerida?', defaultChecked: true }));

  const columnaDerecha = ce(Col, { xs: 2 }, ce(Row, null, eliminador, espacio, puntaje, requerido));

  // unión

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const ContenidoTexto = function() {
  // texto

  // Columna izquierda

  const campo = ce(Form.Control, { as: 'textarea', type: 'text', placeholder: 'Escribe aquí el texto', className: 'h-100' });

  const columnaIzquierda = ce(Col, { xs: 11 }, campo);

  // Columna derecha

  const eliminador = (
    ce(Col, null,
      ce(iconButton,
        {
          size: 'sm',
          iconName: 'fa fa-trash',
          variant: 'danger',
          className: 'position-absolute top-0 end-0',
        }
      )
    )
  );

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, nbsp));

  const columnaDerecha = ce(Col, { xs: 1 }, ce(Row, null, eliminador, espacio));

  // unión

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const ContenidoEnlace = function() {
  // url
  // texto

  // Columna izquierda

  const campoEnlace = ce(Form.Control, { type: 'text', className: 'mb-3', placeholder: 'Escribe aquí el enlace' });

  const campoTexto = ce(Form.Control, { type: 'text', placeholder: 'Escribe aquí el texto' });

  const columnaIzquierda = ce(Col, { xs: 11 }, campoEnlace, campoTexto);

  // Columna derecha

  const eliminador = (
    ce(Col, null,
      ce(iconButton,
        {
          size: 'sm',
          iconName: 'fa fa-trash',
          variant: 'danger',
          className: 'position-absolute top-0 end-0',
        }
      )
    )
  );

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, nbsp));

  const columnaDerecha = ce(Col, { xs: 1 }, ce(Row, null, eliminador, espacio));

  // unión

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const ContenidoImagen = function() {
  // archivo

};


const ContenidoPDF = function() {
  // archivo

};


// ----------------------------------------
// Composites
// ----------------------------------------

const Cabecera = function() {
  return ce('header', null,
    ce('h1', null, rootAttributes.tituloEvaluacion)
  );
};


const ManejadorDeModulos = function({ modulos = [], ...props }) {

  const listaModulos = [
    ce(Modulo, { key: 1, elementos: [
      ce(PreguntaTexto),
      ce(PreguntaSeleccion, {
        opciones: [
          ce(OpcionPreguntaSeleccion),
          ce(OpcionPreguntaSeleccion),
          ce(OpcionPreguntaSeleccion)
        ]
      }),
      ce(PreguntaTexto),

    ] }),
    // ce(Modulo, { key: 2 }),
    // ce(Modulo, { key: 3 }),
  ];

  const btnAgregar = ce(blockButton, { variant: 'success', size: 'lg' }, icon('fa fa-plus'), ' Agregar módulo');

  const panel = (
    ce(Row, {},
      ce(Col, { xs: 12, className: 'mb-3' }, listaModulos),
      ce(Col, { xs: 12, className: 'mb-3' }, btnAgregar),
    )
  );

  return panel;

};


const BotonesFormulario = function() {
  return ce('div', null, 'Botones del formulario');
};



// ----------------------------------------
// Layout
// ----------------------------------------

const Layout = function({north, center, south}) {

  const fila = ce(Row, null,
    ce(Col, { xs: 12 }, north),
    ce(Col, { xs: 12 }, center),
    ce(Col, { xs: 12 }, south),
  );

  return ce(Container, null, fila);

};


// ----------------------------------------
// View
// ----------------------------------------

const View = function() {
  // composites
  const north = ce(Cabecera, null, 'Norte');
  const center = ce(ManejadorDeModulos, null, 'Centro');
  const south = ce(BotonesFormulario, null, 'Sur');

  // layout
  return ce(Fragment, null, ce(Layout, { north, center, south } ));

};


// ----------------------------------------
// External resources
// ----------------------------------------
let ext = null;

ext = document.createElement('link');
ext.rel = 'stylesheet';
ext.href = rootAttributes.bootstrapCss;

shadowRoot.appendChild(ext);

ext = document.createElement('script');
ext.type = 'application/javascript';
ext.src = rootAttributes.bootstrapJs;

shadowRoot.appendChild(ext);

ext = document.createElement('link');
ext.rel = 'stylesheet';
ext.href = rootAttributes.customCss;

shadowRoot.appendChild(ext);

ext = document.createElement('link');
ext.rel = 'stylesheet';
ext.href = rootAttributes.fontAwesomeCss;

shadowRoot.appendChild(ext);


// ----------------------------------------
// Root
// ----------------------------------------

ReactDOM
  .createRoot(shadowRoot)
  .render(ce(StrictMode, null, ce(View)));


})('root', window);
