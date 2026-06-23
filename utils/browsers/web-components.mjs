/**
 * @fileoverview
 * Framework base para crear componentes web nativos, subjects basados en
 * EventTarget y sincronización de interfaz
 * mediante Custom Elements, Shadow DOM, constructable stylesheets y el
 * patrón EventListenerObject.
 *
 * El framework proporciona:
 *
 * - {@link BaseWebComponent}: clase base para crear Custom Elements con
 *   Shadow DOM y estilos encapsulados.
 * - {@link State}: wrapper sobre `EventTarget` que emite eventos con cambios
 *   de estado para otros objetos del sistema.
 * - {@link BaseEventHandler}: clase base para implementar manejadores que
 *   pueden acoplarse a componentes o suscribirse a un subject.
 *
 * Cada componente debe extender {@link BaseWebComponent} y definir:
 *
 * - `htmlString`: contenido HTML del Shadow DOM.
 * - `cssString`: estilos encapsulados del componente.
 *
 * Cada manejador debe extender {@link BaseEventHandler} e implementar el
 * método `handleEvent`.
 *
 * El framework contempla dos usos distintos para los manejadores:
 *
 * - Acoplarlos directamente a componentes para reaccionar a eventos del DOM.
 * - Suscribirlos a un subject instanciado con `new State()` cuando un
 *   proceso ajeno al DOM necesita emitir cambios que terminen reflejándose en
 *   la interfaz.
 *
 * @example <caption>Definición de un componente</caption>
 * class CounterComponent extends BaseWebComponent {}
 *
 * CounterComponent.htmlString = '<p id="display">0</p>'
 * CounterComponent.cssString = 'p { font-variant-numeric: tabular-nums; }'
 * CounterComponent.define('counter-component')
 *
 * @example <caption>Manejador acoplado a un componente</caption>
 * class IncrementCounterHandler extends BaseEventHandler {
 *   handleEvent(event) {
 *     const component = this.refs.get('component')
 *
 *     if (component === null) {
 *       return
 *     }
 *
 *     component.count += 1
 *     component.shadowRoot.getElementById('display').textContent =
 *       String(component.count)
 *   }
 * }
 *
 * const component = new CounterComponent()
 * component.count = 0
 * const handler = new IncrementCounterHandler()
 *
 * handler.refs.set('component', component)
 * component.addEventListener('click', handler)
 *
 * component.dispatchEvent(new Event('click'))
 *
 * @example <caption>Subject para procesos externos al DOM</caption>
 * class SyncCountHandler extends BaseEventHandler {
 *   handleEvent(event) {
 *     const display = this.refs.get('display')
 *
 *     if (display === null) {
 *       return
 *     }
 *
 *     display.textContent = String(event.detail.count)
 *   }
 * }
 *
 * const state = { count: 0 }
 * const subject = new State()
 * const handler = new SyncCountHandler()
 * const display = document.getElementById('display')
 *
 * handler.refs.set('display', display)
 * subject.addEventListener('countchange', handler)
 *
 * state.count += 1
 * subject.dispatchEvent(new CustomEvent('countchange', {
 *   detail: { count: state.count }
 * }))
 */

class WeakRefsMap {
  #refs = {}

  set(key, value) {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new TypeError('key must be a non-empty string')
    }

    if (
      value === undefined ||
      value === null ||
      'function' === typeof value ||
      'object' !== typeof value
    ) {
      throw new TypeError('value must be an object')
    }

    this.#refs[key] = new WeakRef(value)
  }

  get(key) {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new TypeError('key must be a non-empty string')
    }

    const ref = this.#refs[key]

    if (ref === undefined) {
      return null
    }

    const value = ref.deref()

    if (value === undefined) {
      delete this.#refs[key]
      return null
    }

    return value
  }

  has(key) {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new TypeError('key must be a non-empty string')
    }

    return Object.hasOwn(this.#refs, key)
  }

  delete(key) {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new TypeError('key must be a non-empty string')
    }

    return delete this.#refs[key]
  }
}

/**
 * Clase base abstracta para crear componentes web con Shadow DOM y estilos
 * encapsulados mediante constructable stylesheets.
 *
 * Las clases derivadas deben definir las propiedades estáticas `htmlString`
 * y `cssString` antes de registrar el Custom Element.
 *
 * La instancia del componente puede acoplar uno o más manejadores derivados
 * de {@link BaseEventHandler} para responder a eventos normales del DOM.
 *
 * Si otro proceso externo necesita modificar la interfaz, ese flujo debe
 * modelarse aparte con un subject instanciado mediante `new State()` y
 * un manejador que traduzca esos eventos a cambios concretos en el DOM.
 *
 * @abstract
 * @extends HTMLElement
 *
 * @example
 * class CounterComponent extends BaseWebComponent {}
 *
 * CounterComponent.htmlString = '<p id="display">0</p>'
 * CounterComponent.cssString = 'p { font-weight: 700; }'
 *
 * CounterComponent.define('counter-component')
 */
export class BaseWebComponent extends HTMLElement {
  /**
   * Estilos CSS que se aplicarán al Shadow DOM del componente.
   *
   * Las clases derivadas deben reemplazar este valor antes de registrar
   * el Custom Element.
   *
   * @type {string|null}
   */
  static cssString = null

  /**
   * Contenido HTML que se insertará en el Shadow DOM del componente.
   *
   * Las clases derivadas deben reemplazar este valor antes de registrar
   * el Custom Element.
   *
   * @type {string|null}
   */
  static htmlString = null

  /**
   * Crea el Shadow DOM, inserta el contenido HTML y adopta la hoja de estilos
   * definida por la clase derivada.
   *
   * @throws {TypeError}
   * Se lanza cuando se intenta instanciar `BaseWebComponent` directamente.
   *
   * @throws {TypeError}
   * Se lanza cuando `cssString` no es una cadena.
   *
   * @throws {TypeError}
   * Se lanza cuando `htmlString` no es una cadena.
   */
  constructor() {
    super()

    if (new.target === BaseWebComponent) {
      throw new TypeError(
        'BaseWebComponent is an abstract class and cannot be instantiated directly'
      )
    }

    const { cssString, htmlString } = this.constructor

    if (typeof cssString !== 'string') {
      throw new TypeError('cssString must be a string')
    }

    if (typeof htmlString !== 'string') {
      throw new TypeError('htmlString must be a string')
    }

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = htmlString

    const stylesheet = new CSSStyleSheet()
    stylesheet.replace(cssString)

    this.shadowRoot.adoptedStyleSheets.push(stylesheet)
  }

  /**
   * Registra la clase derivada como un Custom Element.
   *
   * @param {string} tagName
   * Nombre del elemento personalizado. Debe ser un nombre válido para
   * Custom Elements.
   *
   * @returns {void}
   *
   * @throws {Error}
   * Se lanza cuando el entorno no soporta Custom Elements.
   *
   * @throws {TypeError}
   * Se lanza cuando `tagName` no es una cadena no vacía.
   */
  static define(tagName) {
    if ('customElements' in window === false) {
      throw new Error('Custom Elements are not supported in this environment')
    }

    if (typeof tagName !== 'string' || tagName.trim() === '') {
      throw new TypeError('tagName must be a non-empty string')
    }

    customElements.define(tagName, this)
  }
}

/**
 * Clase base abstracta para implementar manejadores orientados a eventos
 * mediante el patrón EventListenerObject.
 *
 * Mantiene referencias débiles indexadas por claves string arbitrarias para
 * evitar que el manejador impida la recolección de memoria de nodos u otros
 * objetos asociados.
 *
 * Un manejador puede acoplarse directamente a un componente o suscribirse a
 * un subject instanciado con `new State()`.
 *
 * El segundo caso sirve para procesos externos al DOM que necesitan emitir
 * cambios de estado y dejar que otro objeto traduzca esos cambios a
 * modificaciones concretas en la interfaz.
 *
 * Las clases derivadas deben implementar {@link BaseEventHandler#handleEvent}.
 *
 * @abstract
 * @implements {EventListenerObject}
 *
 * @example
 * class SyncCountHandler extends BaseEventHandler {
 *   handleEvent(event) {
 *     const display = this.refs.get('display')
 *
 *     if (display === null) {
 *       return
 *     }
 *
 *     display.textContent = String(event.detail.count)
 *   }
 * }
 *
 * const state = { count: 0 }
 * const subject = new State()
 * const handler = new SyncCountHandler()
 * const display = document.getElementById('display')
 *
 * handler.refs.set('display', display)
 * subject.addEventListener('countchange', handler)
 *
 * state.count += 1
 * subject.dispatchEvent(new CustomEvent('countchange', {
 *   detail: { count: state.count }
 * }))
 */
export class BaseEventHandler {
  /**
   * Crea un manejador con un mapa de referencias débiles por clave string.
   * Las referencias se envuelven internamente en `WeakRef`.
   *
   * @throws {TypeError}
   * Se lanza cuando se intenta instanciar `BaseEventHandler` directamente.
   */
  constructor() {
    if (new.target === BaseEventHandler) {
      throw new TypeError(
        'BaseEventHandler is an abstract class and cannot be instantiated directly'
      )
    }

    /**
     * Mapa de referencias débiles indexadas por clave string.
     *
     * @type {WeakRefsMap}
     */
    this.refs = new WeakRefsMap()
  }

  /**
   * Procesa un evento recibido desde un componente o desde un subject basado
   * en `EventTarget`.
   *
   * Las clases derivadas deben sobrescribir este método.
   *
   * @abstract
   * @param {Event} event Evento que debe procesarse.
   * @returns {void}
   */
  handleEvent(event) {}
}

/**
 * Subject basado en `EventTarget` para propagar cambios de estado mediante
 * instancias de `CustomEvent`.
 *
 * Restringe la suscripción a manejadores que extiendan
 * {@link BaseEventHandler}.
 *
 * Este objeto sirve para desacoplar procesos ajenos al DOM de la lógica que
 * actualiza la interfaz.
 *
 * @extends EventTarget
 *
 * @example
 * class SyncCountHandler extends BaseEventHandler {
 *   handleEvent(event) {
 *     console.log(event.detail.count)
 *   }
 * }
 *
 * const subject = new Subject()
 * const handler = new SyncCountHandler()
 *
 * subject.addEventListener('countchange', handler)
 * subject.dispatchEvent(new CustomEvent('countchange', {
 *   detail: { count: 1 }
 * }))
 */
export class Subject extends EventTarget {
  /**
   * Suscribe un manejador a un tipo de evento del subject.
   *
   * Solo se aceptan instancias derivadas de {@link BaseEventHandler} para
   * mantener el contrato del patrón `EventListenerObject` dentro del módulo.
   *
   * @param {string} type Nombre del evento a escuchar.
   * @param {BaseEventHandler} handler Manejador que procesará el evento.
   * @param {boolean|AddEventListenerOptions} [options]
   * Opciones estándar de `addEventListener`.
   *
   * @returns {void}
   *
   * @throws {TypeError}
   * Se lanza cuando `type` no es una cadena no vacía.
   *
   * @throws {TypeError}
   * Se lanza cuando `handler` no extiende `BaseEventHandler`.
   */
  addEventListener(type, handler, options) {
    if (typeof type !== 'string' || type.trim() === '') {
      throw new TypeError('type must be a non-empty string')
    }

    if (handler instanceof BaseEventHandler === false) {
      throw new TypeError('handler must extend BaseEventHandler')
    }

    super.addEventListener(type, handler, options)
  }

  /**
   * Elimina un manejador previamente suscrito a un tipo de evento.
   *
   * @param {string} type Nombre del evento asociado al manejador.
   * @param {BaseEventHandler} handler Manejador que se eliminará.
   * @param {boolean|EventListenerOptions} [options]
   * Opciones estándar de `removeEventListener`.
   *
   * @returns {void}
   *
   * @throws {TypeError}
   * Se lanza cuando `type` no es una cadena no vacía.
   *
   * @throws {TypeError}
   * Se lanza cuando `handler` no extiende `BaseEventHandler`.
   */
  removeEventListener(type, handler, options) {
    if (typeof type !== 'string' || type.trim() === '') {
      throw new TypeError('type must be a non-empty string')
    }

    if (handler instanceof BaseEventHandler === false) {
      throw new TypeError('handler must extend BaseEventHandler')
    }

    super.removeEventListener(type, handler, options)
  }

  /**
   * Despacha un cambio de estado.
   *
   * @param {CustomEvent} event Evento personalizado con el nuevo estado en
   * `detail`.
   *
   * @returns {boolean}
   * `true` cuando el evento no fue cancelado, `false` en caso contrario.
   *
   * @throws {TypeError}
   * Se lanza cuando `event` no es una instancia de `CustomEvent`.
   */
  dispatchEvent(event) {
    if (event instanceof CustomEvent === false) {
      throw new TypeError('event must be a CustomEvent')
    }

    return super.dispatchEvent(event)
  }
}
