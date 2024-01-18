# Tutorial de JSDOC

<br>

## Apertura y cierre de comentarios

Todo lo que se escriba entre `/**` y `*/` se considera un comentario de documentación. Cada línea intermedia debe iniciar con `*`.

**Ejemplo:**

```js
/** comentario de una sóla línea */

/**
 * comentario de
 * varias líneas
 */
```

<br>

## Etiquetas

Las etiquetas son palabras que inician con `@` y que se usan para indicar el tipo de información que se está documentando.

**Ejemplo:**

```js
/** @etiqueta */

/**
 * @etiqueta
 * @etiqueta
 */
```

<br>

## Abstract

@abstract _(synonyms: @virtual)_ Identifica un miembro que debe ser implementado (o sobreescrito) por los objetos que lo hereden.

**Ejemplo:**

```js
/**
 * @abstract
 */
SuperClass.prototype.theMethod = function() {
    throw new Error('not implemented');
};
```

<br>

## Access

> @access &lt;nivel&gt;

@access especifica el nivel de acceso de un miembro.

El texto a continuación de la etiqueta indica el nivel de acceso que puede ser:
- package
- private
- protected
- public

Se puede usar como sinónimo de otras etiquetas:
- @access package = @package
- @access private = @private
- @access protected = @protected
- @access public = @public

**Ejemplo:**

```js
/**
 * @access package
 */
function TheClass() {
    /**
     * @access private
     */
    let privateMember = null;

    /**
     * @access protected
     */
    this.protectedMember = null;

    /**
     * @access public
     */
    this.publicMember = null;
}
```

<br>

## Async

@async especifica que una función es asíncrona.

**Ejemplo:**

```js
/**
 * @async
 */
async function fn() {
    // ...
}

/**
 * @async
 */
function fn() {
    return new Promise(
        // ...
    );
}
```

<br>

## Author

> @author nombre &lt;correo&gt;

@author identifica el autor de un elemento. Se debe agregar el nombre y opcionalmente se puede agregar un medio de contacto entre símbolos `<` y `>`.

**Ejemplo:**

```js
/**
 * @author John Doe <john.doe@example.com>
 */
```

## Borrows

> @borrows &lt;padre&gt; as &lt;hijo&gt;

@borrows especifica que un miembro hereda la documentación de otro miembro.

**Ejemplo:**

```js
/**
 * @borrows window.alert as alert
 */
const util = {
    alert: window.alert,
};
```

<br>

## Class

@class marca una función como constructora, lo que significa que se usará con el operador `new` para crear objetos.

**Ejemplo:**

```js
/**
 * @class
 */
function Entity() {
    // ...
}

const entity = new Entity();
```

<br>

## Desestructuración

La desestructuración consiste en extraer valores de un objeto o un array en variables independientes.

Para documentar la desestructuración se usa la etiqueta `@type` y se indica el tipo de dato que se espera en cada variable entre `[` y `]` para arrays o entre `{` y `}` para objetos.

**Ejemplo:**

```js
/**
 * @type {[string, number]}
 */
const [first, second] = list;

/**
 * @type {{aa: string, bb: number}}
 */
const {aa, bb} = object;
```
