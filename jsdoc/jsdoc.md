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

## Alias

@alias _(synonyms: @name)_ Especifica un nombre alternativo para un miembro.

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
