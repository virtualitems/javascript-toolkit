# Tutorial de JSDOC

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
