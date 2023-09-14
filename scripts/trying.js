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

if (!window.crypto) {
  console.error('Crypto is not loaded');
  return;
}


// ----------------------------------------
// Globals
// ----------------------------------------

const {
  crypto,
  document,
  React,
  ReactDOM,

} = window;

const {
  createElement: ce,
  Fragment,
  StrictMode,
  useEffect,
  useState,

} = React;

const {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,

} = ReactBootstrap;

const unicode = {
  nbsp: '\u00A0',
};

const root = document.getElementById(rid);

const shadowRoot = root.attachShadow({mode: 'closed'});

const rootAttributes = {
  bootstrapCss: root.getAttribute('bootstrap-css'),
  bootstrapJs: root.getAttribute('bootstrap-js'),
  customCss: root.getAttribute('custom-css'),
  fontAwesomeCss: root.getAttribute('font-awesome-css'),
  tituloEvaluacion: root.getAttribute('titulo-evaluacion'),
  requestUuid: root.getAttribute('request-uuid'),
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


function debounce(func, timeout=1000) {
  let timer;

  const wrapper = function() {
    const thisArg = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(func.bind(thisArg, ...args), timeout);
  };

  return wrapper;
};


// ----------------------------------------
// Hooks
// ----------------------------------------

function useKeyGenerator() {
  const [keys, setKeys] = useState([]);

  function next() {
    const key = crypto.randomUUID();
    setKeys([...keys, key]);
    return key;
  };

  return [keys, next];
};


function useSerialGenerator(start=0) {
  const _start = Number(start);

  const [serial, setSerial] = useState(_start);

  function next() {
    setSerial(serial + 1);
    return serial;
  };

  return [serial, next];
};


// ----------------------------------------
// Context
// ----------------------------------------



// ----------------------------------------
// Models
// ----------------------------------------

const ModeloBase = class {
  constructor(key=null) {
    this.key = key;
  }
};

const ModeloContenidoTexto = class extends ModeloBase {
  constructor(texto='', key) {
    super(key);
    this.texto = texto;
  }
};


const ModeloContenidoEnlace = class extends ModeloBase {
  constructor(url='', texto='', key) {
    super(key);
    this.url = url;
    this.texto = texto;
  }
};


const ModeloContenidoImagen = class extends ModeloBase {
  constructor(archivo=null, key) {
    super(key);
    this.archivo = archivo;
  }
};


const ModeloContenidoPDF = class extends ModeloBase {
  constructor(archivo=null, key) {
    super(key);
    this.archivo = archivo;
  }
};


const ModeloOpcionPreguntaSeleccion = class extends ModeloBase {
  constructor(descripcion='', correcta=false, key) {
    super(key);
    this.descripcion = descripcion;
    this.correcta = correcta;
  }
};


const ModeloPreguntaSeleccion = class extends ModeloBase {
  constructor(opciones=[], puntaje=0, requerida=true, key) {
    super(key);
    this.opciones = opciones;
    this.puntaje = puntaje;
    this.requerida = requerida;
  }
};


const ModeloPreguntaTexto = class extends ModeloBase {
  constructor(puntaje=0, requerida=true, key) {
    super(key);
    this.puntaje = puntaje;
    this.requerida = requerida;
  }
};


const ModeloElemento = class extends ModeloBase {

  contenido = {
    texto: Symbol('texto'),
    enlace: Symbol('enlace'),
    imagen: Symbol('imagen'),
    pdf: Symbol('pdf'),
  };

  pregunta = {
    seleccion: Symbol('seleccion'),
    texto: Symbol('texto'),
  };

  constructor(orden, tipo='', objeto=null, key) {
    super(key);
    this.orden = orden;
    this.tipo = tipo;
    this.objeto = objeto;
  }

};


const ModeloModulo = class extends ModeloBase {
  constructor(nombre='', elementos=[], key) {
    super(key);
    this.nombre = nombre;
    this.elementos = elementos;
  }
};


const ModeloEvaluacion = class extends ModeloBase {
  constructor(modulos=[], key) {
    super(key);
    this.modulos = modulos;
  }
};


// ----------------------------------------
// Contents
// ----------------------------------------

const iconButton = function({ children, iconName, ...props }) {
  return ce(Button, props, icon(iconName), children);
};


const blockButton = function({children, ...props}) {
  return ce('div', { className: 'd-grid gap-2' }, ce(Button, props, children));
};


const Enunciado = function({ children, ...props }) {
  return ce('div', props, ce('span', null, children));
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


const AgregarContenidoModal = function({ children, mostrando, fnOcultar, ...props }) {

  const modal = (
    ce(Modal, { show: mostrando, onHide: fnOcultar, container: shadowRoot },
      ce(Modal.Header, { closeButton: true },
        ce(Modal.Title, null, 'Agregar contenido')
      ),
      ce(Modal.Body, null, 'Woohoo, you are reading this text in a modal!'),
      ce(Modal.Footer, null,
        ce(Button, { variant: 'secondary', onClick: fnOcultar }, 'Close'),
        ce(Button, { variant: 'primary', onClick: fnOcultar }, 'Save Changes')
      )
    )
  );

  return ce(Fragment, null, modal);
};


const AgregarPreguntaModal = function({ children, mostrando, fnOcultar, ...props }) {

  const modal = (
    ce(Modal, { show: mostrando, onHide: fnOcultar, container: shadowRoot },
      ce(Modal.Header, { closeButton: true },
        ce(Modal.Title, null, 'Agregar contenido')
      ),
      ce(Modal.Body, null, 'Woohoo, you are reading this text in a modal!'),
      ce(Modal.Footer, null,
        ce(Button, { variant: 'secondary', onClick: fnOcultar }, 'Close'),
        ce(Button, { variant: 'primary', onClick: fnOcultar }, 'Save Changes')
      )
    )
  );

  return ce(Fragment, null, modal);

};


const Modulo = function({
    elementos = [],
    fnActualizar = () => {},
    fnQuitar = () => {},
    ...props
  }) {

  const campoNombre = ce(Form.Control, { type: 'text', onChange: (e) => fnActualizar({ nombre: e.target.value }) });

  const title = ce(Fragment, null,
    ce(Col, { xs: 3, className: 'mb-4' }, ce('span', { className: 'h3' }, 'Nombre del módulo:')),
    ce(Col, { xs: 9, className: 'mb-4' }, campoNombre),
  );

  const filasElementos = elementos.map((elemento, i) => ce(Col, { key: i, xs: 12, className: 'mb-3' }, elemento, ce('hr')));

  const [mostrandoModalContenido, cambiarMostrandoModalContenido] = useState(false);

  const modalContenido = ce(AgregarContenidoModal, { mostrando: mostrandoModalContenido, fnOcultar: () => cambiarMostrandoModalContenido(false) });

  const [mostrandoModalPregunta, cambiarMostrandoModalPregunta] = useState(false);

  const modalPregunta = AgregarPreguntaModal({ mostrando: mostrandoModalPregunta, fnOcultar: () => cambiarMostrandoModalPregunta(false) });

  const btnAgregarContenidos = ce(blockButton,
    {
      variant: 'primary',
      size: 'lg',
      onClick: (e) => cambiarMostrandoModalContenido(true),
    },
    icon('fa fa-plus'),
    ' Agregar contenidos'
  );

  const btnAgregarCampos = ce(blockButton,
    {
      variant: 'primary',
      size: 'lg',
      onClick: (e) => cambiarMostrandoModalPregunta(true),
    },
    icon('fa fa-plus'),
    ' Agregar preguntas'
  );

  const btnEliminarModulo = (
    ce(iconButton,
      {
        className: 'position-absolute top-0 end-0',
        iconName: 'fa fa-trash',
        size: 'sm',
        variant: 'danger',
        onClick: (e) => fnQuitar(),
      },
      ' Eliminar módulo'
    )
  );

  const botones = ce(Fragment, null,
    ce(Col, { xs: 6, className: 'mb-3' }, btnAgregarContenidos),
    ce(Col, { xs: 6, className: 'mb-3' }, btnAgregarCampos),
  );

  const panel = (
    ce(Card,
      {
        className: 'shadow px-3 py-5 mb-5 bg-body rounded',
      },
      btnEliminarModulo,
      ce(Card.Body, null,
        ce(Row, null,
          title,
          filasElementos,
          botones,
          modalContenido,
          modalPregunta,
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

  const listaOpcionesConLinea = opciones.map((opcion, i) => ce('div', { key: i, className: 'mb-2' }, opcion));

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

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, unicode.nbsp));

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

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, unicode.nbsp));

  const puntaje = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Control, { type: 'number', placeholder: 'Puntaje' }));

  const requerido = ce(Col, { xs: 12, className: 'mb-4' }, ce(Form.Check, { type: 'checkbox', label: '¿Requerida?', defaultChecked: true }));

  const columnaDerecha = ce(Col, { xs: 2 }, ce(Row, null, eliminador, espacio, puntaje, requerido));

  // unión

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const ContenidoTexto = function({ children, ...props }) {
  // texto

  // Columna izquierda

  const campo = ce(Form.Control, { as: 'textarea', type: 'text', placeholder: 'Escribe aquí el texto', rows: 5 });

  const enunciado = ce(Enunciado, { className: 'mb-3' }, 'Contenido de texto:');

  const columnaIzquierda = ce(Col, { xs: 11 }, enunciado, campo);

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

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, unicode.nbsp));

  const columnaDerecha = ce(Col, { xs: 1 }, ce(Row, null, eliminador, espacio));

  // unión

  return ce(DosColumnas, { ...props, izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const ContenidoEnlace = function() {
  // url
  // texto

  // Columna izquierda

  const campoEnlace = ce(Form.Control, { type: 'text', className: 'mb-3', placeholder: 'Escribe aquí la URL' });

  const campoTexto = ce(Form.Control, { type: 'text', placeholder: 'Escribe aquí el texto del enlace' });

  const enunciado = ce(Enunciado, { className: 'mb-3' }, 'Contenido de enlace:');

  const columnaIzquierda = ce(Col, { xs: 11 }, enunciado, campoEnlace, campoTexto);

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

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, unicode.nbsp));

  const columnaDerecha = ce(Col, { xs: 1 }, ce(Row, null, eliminador, espacio));

  // unión

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const ContenidoImagen = function() {
  // archivo

  // Columna izquierda

  const campoArchivo = ce(Form.Control, { type: 'file', className: 'mb-3', accept: 'image/*' });

  const enunciado = ce(Enunciado, { className: 'mb-3' }, 'Contenido de imágen:');

  const columnaIzquierda = ce(Col, { xs: 11 }, enunciado, campoArchivo);

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

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, unicode.nbsp));

  const columnaDerecha = ce(Col, { xs: 1 }, ce(Row, null, eliminador, espacio));

  // unión

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


const ContenidoPDF = function() {
  // archivo

  // Columna izquierda

  const campoArchivo = ce(Form.Control, { type: 'file', className: 'mb-3', accept: 'application/pdf' });

  const enunciado = ce(Enunciado, { className: 'mb-3' }, 'Contenido de documento PDF:');

  const columnaIzquierda = ce(Col, { xs: 11 }, enunciado, campoArchivo);

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

  const espacio = ce(Col, { xs: 12, className: 'mb-3' }, ce('div', null, unicode.nbsp));

  const columnaDerecha = ce(Col, { xs: 1 }, ce(Row, null, eliminador, espacio));

  // unión

  return ce(DosColumnas, { izquierda: columnaIzquierda, derecha: columnaDerecha });

};


// ----------------------------------------
// Composites
// ----------------------------------------

const Cabecera = function({children, ...props}) {
  return ce('header', props,
    ce('h1', null, rootAttributes.tituloEvaluacion)
  );
};


const ManejadorDeModulos = function({ ...props }) {

  const [listaModulos, guardarModulos] = useState([]);

  const [serialModulos, siguienteSerialModulos] = useSerialGenerator();

  const agregarModulo = function(key) {
    const modulo = new ModeloModulo('', [], key);
    const modulos = [...listaModulos, modulo];
    guardarModulos(modulos);
  };

  const quitarModulo = function(key) {
    const modulos = listaModulos.filter(modulo => modulo.key !== key);
    guardarModulos(modulos);
  };

  const actualizarModulo = function(key, datos) {
    const indice = listaModulos.findIndex(modulo => modulo.key === key);

    if (datos.nombre)
      listaModulos[indice].nombre = datos.nombre;

    if (datos.elementos)
      listaModulos[indice].elementos = datos.elementos;

      guardarModulos(listaModulos);
  }

  const eventoAgregarModulo = function() {
    const key = siguienteSerialModulos();
    agregarModulo(key);
  };

  const btnAgregar = ce(blockButton,
    {
      variant: 'success',
      size: 'lg',
      onClick: eventoAgregarModulo,
    },
    icon('fa fa-plus'),
    ' Agregar módulo'
  );

  const componentesModulos = listaModulos.map(
    function(modulo) {
      return ce(Modulo, {
        key: modulo.key,
        elementos: modulo.elementos,
        fnActualizar: (datos) => actualizarModulo(modulo.key, datos),
        fnQuitar: () => quitarModulo(modulo.key)
      })
    }
  );

  const panel = (
    ce(Row, { ...props },
      ce(Col, { xs: 12, className: 'mb-3' }, componentesModulos),
      ce(Col, { xs: 12, className: 'mb-3' }, btnAgregar),
    )
  );

  console.log(listaModulos);

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
  const north = ce(Cabecera, { className: 'mb-5' });
  const center = ce(ManejadorDeModulos, { className: 'mb-5' });
  const south = ce(BotonesFormulario);

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
ext.href = [rootAttributes.customCss, '?v=', rootAttributes.requestUuid].join('');

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
