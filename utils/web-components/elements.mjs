/**
 * @description Provides a synchronous DOM factory with React.createElement's call shape.
 * No event system, reconciliation, or fragment creation is included.
 * @module dom-create-element
 */

/** @description Standard HTML content attributes and global extensions. */
const standardHTMLAttributes = new Set([
    'abbr',
    'accept',
    'accept-charset',
    'accesskey',
    'action',
    'allow',
    'allowfullscreen',
    'alpha',
    'alt',
    'anchor',
    'as',
    'async',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'autoplay',
    'blocking',
    'charset',
    'checked',
    'cite',
    'class',
    'closedby',
    'color',
    'colorspace',
    'cols',
    'colspan',
    'command',
    'commandfor',
    'content',
    'contenteditable',
    'controls',
    'coords',
    'crossorigin',
    'data',
    'datetime',
    'decoding',
    'default',
    'defer',
    'dir',
    'dirname',
    'disabled',
    'download',
    'draggable',
    'elementtiming',
    'enctype',
    'enterkeyhint',
    'exportparts',
    'fetchpriority',
    'for',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'headers',
    'headingoffset',
    'headingreset',
    'height',
    'hidden',
    'high',
    'href',
    'hreflang',
    'http-equiv',
    'id',
    'imagesizes',
    'imagesrcset',
    'inert',
    'inputmode',
    'integrity',
    'is',
    'ismap',
    'itemid',
    'itemprop',
    'itemref',
    'itemscope',
    'itemtype',
    'kind',
    'label',
    'lang',
    'list',
    'loading',
    'loop',
    'low',
    'max',
    'maxlength',
    'media',
    'method',
    'min',
    'minlength',
    'multiple',
    'muted',
    'name',
    'nomodule',
    'nonce',
    'novalidate',
    'open',
    'optimum',
    'part',
    'pattern',
    'ping',
    'placeholder',
    'playsinline',
    'popover',
    'popovertarget',
    'popovertargetaction',
    'poster',
    'preload',
    'readonly',
    'referrerpolicy',
    'rel',
    'required',
    'reversed',
    'role',
    'rows',
    'rowspan',
    'sandbox',
    'scope',
    'selected',
    'shadowrootclonable',
    'shadowrootcustomelementregistry',
    'shadowrootdelegatesfocus',
    'shadowrootmode',
    'shadowrootserializable',
    'shadowrootslotassignment',
    'shape',
    'size',
    'sizes',
    'slot',
    'span',
    'spellcheck',
    'src',
    'srcdoc',
    'srclang',
    'srcset',
    'start',
    'step',
    'style',
    'tabindex',
    'target',
    'title',
    'translate',
    'type',
    'usemap',
    'value',
    'virtualkeyboardpolicy',
    'width',
    'wrap',
    'writingsuggestions'
])

/** @description Standard WAI-ARIA states and properties. */
const standardARIAAttributes = new Set([
    'aria-activedescendant',
    'aria-atomic',
    'aria-autocomplete',
    'aria-braillelabel',
    'aria-brailleroledescription',
    'aria-busy',
    'aria-checked',
    'aria-colcount',
    'aria-colindex',
    'aria-colindextext',
    'aria-colspan',
    'aria-controls',
    'aria-current',
    'aria-describedby',
    'aria-description',
    'aria-details',
    'aria-disabled',
    'aria-dropeffect',
    'aria-errormessage',
    'aria-expanded',
    'aria-flowto',
    'aria-grabbed',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-keyshortcuts',
    'aria-label',
    'aria-labelledby',
    'aria-level',
    'aria-live',
    'aria-modal',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-owns',
    'aria-placeholder',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-roledescription',
    'aria-rowcount',
    'aria-rowindex',
    'aria-rowindextext',
    'aria-rowspan',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext'
])

/** @description Event handler names are not permitted in DOM props or attributes. */
const eventNamePattern = /^on[a-z]/i

/** @description Valid lower-case WAI-ARIA attribute name syntax. */
const ariaAttributePattern = /^aria-[a-z][a-z0-9-]*$/u

/** @description XML-compatible characters following the data- attribute prefix. */
const dataAttributePattern = /^data-[\p{L}\p{M}\p{N}_.:\u00B7\u203F-\u2040-]+$/u

/** @description Prohibits ASCII uppercase characters in custom data attribute names. */
const uppercaseASCIINamePattern = /[A-Z]/

/** @description Native WAI-ARIA property names. */
const ariaStringPropertyPattern = /^aria[A-Z][A-Za-z0-9]*$/u

/** @description Native WAI-ARIA properties that refer to one element. */
const ariaElementPropertyPattern = /^aria[A-Z][A-Za-z0-9]*Element$/u

/** @description Native WAI-ARIA properties that refer to multiple elements. */
const ariaElementsPropertyPattern = /^aria[A-Z][A-Za-z0-9]*Elements$/u

/** @description Native IDL properties that may start out null but accept strings. */
const nullableStringProperties = new Set(['crossOrigin'])

/** @description Nullable native properties that refer to one HTML element. */
const nullableElementProperties = new Set([
    'commandForElement',
    'interestTargetElement',
    'popoverTargetElement'
])

/** @description DOM collections and forwarding properties that are not assignable. */
const unassignableProperties = new Set([
    'attributes',
    'childNodes',
    'children',
    'classList',
    'dataset',
    'part',
    'relList',
    'style'
])

/** @description Native numeric IDL properties whose values must be integral. */
const integerProperties = new Set([
    'colSpan',
    'cols',
    'height',
    'length',
    'maxLength',
    'minLength',
    'rowSpan',
    'rows',
    'selectedIndex',
    'selectionEnd',
    'selectionStart',
    'size',
    'span',
    'start',
    'tabIndex',
    'width'
])

/**
 * @typedef {Node | null | undefined} Child
 * @description A child of the created element. Text must be an explicit Text node.
 */

/**
 * @typedef {Record<string, unknown>} DOMProps
 * @description Native DOM properties, directly named standard HTML attributes,
 * and an optional attrs record for exact setAttribute calls. No aliases,
 * stringification, token joining, or special style/dataset inputs are provided.
 */

/**
 * @description Creates a DOM tree using the React.createElement call shape.
 * Only native DOM values are accepted. Externally created DocumentFragments
 * are allowed as children; props.children, fragments as type, and events are not.
 * @param {string} type - HTML tag name.
 * @param {DOMProps | null} [props=null] - Standard DOM properties and attributes.
 * @param {...Child} children - DOM nodes, null, or undefined; text must be Text nodes.
 * @returns {HTMLElement} A native HTML element.
 * @throws {TypeError} For events, unknown attributes, invalid children,
 * read-only properties, or a non-string element type.
 * @throws {DOMException} For invalid tag names or browser-level DOM failures.
 */
export function createElement(type, props = null, ...children) {
    const ownProps = props ?? {}

    validateElementType(type)
    validateProps(ownProps)

    const element = document.createElement(type)

    for (const [name, value] of Object.entries(ownProps)) {
        if (name === 'value') {
            continue
        }

        setProperty(element, name, value)
    }

    appendChildren(element, children)

    // A <select> needs its <option> descendants before setting its value.
    if (Object.hasOwn(ownProps, 'value')) {
        setProperty(element, 'value', ownProps.value)
    }

    return element
} //:: createElement

/**
 * @description Ensures the factory receives an HTML tag name, not a function or node.
 * @param {unknown} type - Candidate element type.
 * @returns {void} Nothing.
 * @throws {TypeError} If type is not a string.
 */
function validateElementType(type) {
    if (typeof type !== 'string') {
        throw new TypeError('Element type must be an HTML tag string')
    }
} //:: validateElementType

/**
 * @description Checks the props container and reserved names before DOM creation.
 * @param {unknown} props - Candidate property record.
 * @returns {void} Nothing.
 * @throws {TypeError} For an invalid record, children in props, or event names.
 */
function validateProps(props) {
    if (props === null || typeof props !== 'object' || Array.isArray(props) === true) {
        throw new TypeError('props must be an object or null')
    }

    if (Object.hasOwn(props, 'children') === true) {
        throw new TypeError('Pass children as arguments, not as props.children')
    }

    for (const name of Object.keys(props)) {
        validateEventName(name)
    }
} //:: validateProps

/**
 * @description Rejects DOM event property and attribute names.
 * @param {string} name - Candidate name.
 * @returns {void} Nothing.
 * @throws {TypeError} If the name has the syntax of an event handler.
 */
function validateEventName(name) {
    if (eventNamePattern.test(name) === true) {
        throw new TypeError(`Event properties are unsupported: ${name}`)
    }
} //:: validateEventName

/**
 * @description Appends existing nodes and DocumentFragments in order.
 * @param {Node} parent - Newly created parent, mutated by this method.
 * @param {readonly Child[]} children - Nodes or absence sentinels.
 * @returns {void} Nothing.
 * @throws {TypeError} If a child is neither a Node nor nullish.
 * @throws {DOMException} If native node insertion fails.
 */
function appendChildren(parent, children) {
    for (const child of children) {
        appendChild(parent, child)
    }
} //:: appendChildren

/**
 * @description Appends a Node or returns early for null or undefined.
 * @param {Node} parent - Parent node to mutate.
 * @param {Child} child - DOM node or absence sentinel.
 * @returns {void} Nothing.
 * @throws {TypeError} When the child is not a Node or nullish.
 * @throws {DOMException} If appendChild fails in the browser.
 */
function appendChild(parent, child) {
    if (child === null || child === undefined) {
        return
    }

    if (child instanceof Node === false) {
        throw new TypeError('Children must be DOM nodes, null, or undefined')
    }

    parent.appendChild(child)
} //:: appendChild

/**
 * @description Assigns a native DOM property or a standard content attribute.
 * Validation precedes every assignment, including assignments of nullish values.
 * @param {HTMLElement} element - The element being initialized.
 * @param {string} name - The exact property or attribute name.
 * @param {unknown} value - An already correctly typed native DOM value.
 * @returns {void} Nothing.
 * @throws {TypeError} When a name, value, or property assignment is unsupported.
 * @throws {DOMException} If a native DOM setter rejects the value.
 */
function setProperty(element, name, value) {
    if (name === 'attrs') {
        setAttributes(element, value)
        return
    }

    if (unassignableProperties.has(name) === true) {
        throw new TypeError(`Non-assignable DOM collection property: ${name}`)
    }

    const descriptor = findDescriptor(element, name)

    if (descriptor === null) {
        setAttribute(element, name, value)
        return
    }

    setNativeProperty(element, name, value, descriptor)
} //:: setProperty

/**
 * @description Writes a native DOM property only after access and type checks.
 * @param {HTMLElement} element - Newly created HTML element.
 * @param {string} name - Native DOM property name.
 * @param {unknown} value - Candidate native value.
 * @param {PropertyDescriptor} descriptor - Descriptor from a DOM prototype.
 * @returns {void} Nothing.
 * @throws {TypeError} If the property is blocked, read-only, or has an invalid value.
 * @throws {DOMException} If the browser setter rejects the value.
 */
function setNativeProperty(element, name, value, descriptor) {
    validateWritableProperty(name, descriptor)
    validatePropertyValue(element, name, value)

    const isAssigned = Reflect.set(element, name, value)

    if (isAssigned === false) {
        throw new TypeError(`Cannot assign DOM property: ${name}`)
    }
} //:: setNativeProperty

/**
 * @description Checks whether a native DOM property is writable by this factory.
 * @param {string} name - Native property name.
 * @param {PropertyDescriptor} descriptor - Native property descriptor.
 * @returns {void} Nothing.
 * @throws {TypeError} For collections, methods, and read-only properties.
 */
function validateWritableProperty(name, descriptor) {
    if (typeof descriptor.value === 'function') {
        throw new TypeError(`Cannot replace a DOM method: ${name}`)
    }

    const canWrite = descriptor.set !== undefined || descriptor.writable === true

    if (canWrite === false) {
        throw new TypeError(`Read-only DOM property: ${name}`)
    }
} //:: validateWritableProperty

/**
 * @description Chooses a validation contract by the native property name.
 * @param {HTMLElement} element - DOM element exposing the property.
 * @param {string} name - Native DOM property name.
 * @param {unknown} value - Candidate property value.
 * @returns {void} Nothing.
 * @throws {TypeError} If the property's native type contract is not satisfied.
 */
function validatePropertyValue(element, name, value) {
    if (name === 'hidden') {
        validateHiddenValue(value)
        return
    }

    if (name === 'valueAsDate') {
        validateNullableDate(value, name)
        return
    }

    if (name === 'files') {
        validateNullableFileList(value, name)
        return
    }

    if (name === 'srcObject') {
        validateNullableMediaSource(value, name)
        return
    }

    if (
        nullableElementProperties.has(name) === true
        || ariaElementPropertyPattern.test(name) === true
    ) {
        validateNullableElement(value, name)
        return
    }

    if (ariaElementsPropertyPattern.test(name) === true) {
        validateNullableElementSequence(value, name)
        return
    }

    if (
        nullableStringProperties.has(name) === true
        || ariaStringPropertyPattern.test(name) === true
    ) {
        validateNullableString(value, name)
        return
    }

    if (integerProperties.has(name) === true) {
        validateInteger(value, name)
        return
    }

    const currentValue = Reflect.get(element, name)

    validateSingleTypeProperty(currentValue, value, name)
} //:: validatePropertyValue

/**
 * @description Validates a native property whose type is represented by one scalar.
 * @param {unknown} currentValue - Existing value from the DOM getter.
 * @param {unknown} value - Candidate native value.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If its type cannot be determined or is incompatible.
 */
function validateSingleTypeProperty(currentValue, value, name) {
    if (currentValue === null) {
        if (value !== null) {
            throw new TypeError(`Unsupported native nullable property value: ${name}`)
        }

        return
    }

    if (
        currentValue === undefined || typeof currentValue === 'object'
        || typeof currentValue === 'function'
    ) {
        throw new TypeError(`Unsupported native DOM property contract: ${name}`)
    }

    if (value === null || value === undefined || typeof value !== typeof currentValue) {
        throw new TypeError(`Invalid native DOM property type: ${name}`)
    }
} //:: validateSingleTypeProperty

/**
 * @description Validates the boolean/string union defined for HTMLElement.hidden.
 * @param {unknown} value - Candidate hidden state.
 * @returns {void} Nothing.
 * @throws {TypeError} When the state is not a native supported type/value.
 */
function validateHiddenValue(value) {
    if (typeof value === 'boolean' || value === 'until-found') {
        return
    }

    throw new TypeError('Native DOM property requires boolean or until-found: hidden')
} //:: validateHiddenValue

/**
 * @description Validates an integral number without numeric conversion.
 * @param {unknown} value - Candidate integer.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If the value is not an integer.
 */
function validateInteger(value, name) {
    if (typeof value !== 'number' || Number.isInteger(value) === false) {
        throw new TypeError(`Native DOM property requires an integer: ${name}`)
    }
} //:: validateInteger

/**
 * @description Validates null or an unconverted JavaScript string.
 * @param {unknown} value - Candidate nullable string.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If the value is neither null nor a string.
 */
function validateNullableString(value, name) {
    if (value === null || typeof value === 'string') {
        return
    }

    throw new TypeError(`Native DOM property requires a nullable string: ${name}`)
} //:: validateNullableString

/**
 * @description Validates null or an existing Date instance.
 * @param {unknown} value - Candidate native date.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If the value is neither null nor a Date.
 */
function validateNullableDate(value, name) {
    if (value === null || value instanceof Date) {
        return
    }

    throw new TypeError(`Native DOM property requires Date or null: ${name}`)
} //:: validateNullableDate

/**
 * @description Validates null or a native FileList without constructing one.
 * @param {unknown} value - Candidate file collection.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If the value is neither null nor a FileList.
 */
function validateNullableFileList(value, name) {
    if (value === null) {
        return
    }

    if (typeof FileList !== 'undefined' && value instanceof FileList) {
        return
    }

    throw new TypeError(`Native DOM property requires FileList or null: ${name}`)
} //:: validateNullableFileList

/**
 * @description Validates null or an existing DOM Element reference.
 * @param {unknown} value - Candidate element reference.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If the value is neither null nor an Element.
 */
function validateNullableElement(value, name) {
    if (value === null) {
        return
    }

    if (typeof Element !== 'undefined' && value instanceof Element) {
        return
    }

    throw new TypeError(`Native DOM property requires Element or null: ${name}`)
} //:: validateNullableElement

/**
 * @description Validates null or an array containing only existing DOM Elements.
 * @param {unknown} value - Candidate element sequence.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If the value is not a sequence of Elements or null.
 */
function validateNullableElementSequence(value, name) {
    if (value === null) {
        return
    }

    if (
        typeof Element !== 'undefined' && Array.isArray(value) === true
        && value.every((element) => element instanceof Element) === true
    ) {
        return
    }

    throw new TypeError(`Native DOM property requires Element[] or null: ${name}`)
} //:: validateNullableElementSequence

/**
 * @description Validates null or a browser-supported HTMLMediaElement.srcObject type.
 * @param {unknown} value - Candidate media object.
 * @param {string} name - Native property name for diagnostics.
 * @returns {void} Nothing.
 * @throws {TypeError} If the value is not a supported media source or null.
 */
function validateNullableMediaSource(value, name) {
    if (value === null) {
        return
    }

    const isBlob = typeof Blob !== 'undefined' && value instanceof Blob
    const isStream = typeof MediaStream !== 'undefined' && value instanceof MediaStream
    const isMediaSource = typeof MediaSource !== 'undefined'
        && value instanceof MediaSource

    if (isBlob === true || isStream === true || isMediaSource === true) {
        return
    }

    throw new TypeError(`Native DOM property requires a media source or null: ${name}`)
} //:: validateNullableMediaSource

/**
 * @description Assigns an explicit record of standard string-valued HTML attributes.
 * @param {Element} element - Element whose attributes are mutated.
 * @param {unknown} attributes - A plain record of attribute names to strings.
 * @returns {void} Nothing.
 * @throws {TypeError} When the record, an attribute name, or a value is invalid.
 */
function setAttributes(element, attributes) {
    validateAttributesRecord(attributes)

    for (const [name, value] of Object.entries(attributes)) {
        setAttribute(element, name, value)
    }
} //:: setAttributes

/**
 * @description Ensures attrs is a plain record before iterating over its entries.
 * @param {unknown} attributes - Candidate attributes record.
 * @returns {void} Nothing.
 * @throws {TypeError} If the input is not a plain record.
 */
function validateAttributesRecord(attributes) {
    if (
        attributes === null || typeof attributes !== 'object'
        || Array.isArray(attributes) === true
    ) {
        throw new TypeError('attrs must be a plain record of strings')
    }

    const prototype = Object.getPrototypeOf(attributes)

    if (prototype !== Object.prototype && prototype !== null) {
        throw new TypeError('attrs must be a plain record of strings')
    }
} //:: validateAttributesRecord

/**
 * @description Finds a descriptor on an element's DOM prototype chain.
 * Own extension properties and Object.prototype members are excluded.
 * @param {HTMLElement} element - Element whose prototypes are inspected.
 * @param {string} name - JavaScript property name.
 * @returns {PropertyDescriptor | null} Descriptor or null when absent.
 */
function findDescriptor(element, name) {
    let target = Object.getPrototypeOf(element)

    while (target !== null && target !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(target, name)

        if (descriptor !== undefined) {
            return descriptor
        }

        target = Object.getPrototypeOf(target)
    }

    return null
} //:: findDescriptor

/**
 * @description Validates canonical standard HTML, WAI-ARIA, or custom data names.
 * @param {string} name - Exact attribute name as passed to setAttribute.
 * @returns {void} Nothing.
 * @throws {TypeError} If the attribute is an event or is not standard.
 */
function validateAttributeName(name) {
    validateAttributeEventName(name)

    const isHTML = standardHTMLAttributes.has(name) === true
    const isARIA = isStandardARIAAttribute(name)
    const isData = isStandardDataAttribute(name)

    if (isHTML === false && isARIA === false && isData === false) {
        throw new TypeError(`Unknown HTML attribute: ${name}`)
    }
} //:: validateAttributeName

/**
 * @description Rejects event handler syntax in content attributes.
 * @param {string} name - Candidate content attribute name.
 * @returns {void} Nothing.
 * @throws {TypeError} If the name identifies an event attribute.
 */
function validateAttributeEventName(name) {
    if (eventNamePattern.test(name) === true) {
        throw new TypeError(`Event attributes are unsupported: ${name}`)
    }
} //:: validateAttributeEventName

/**
 * @description Determines whether an attribute is listed in standard WAI-ARIA.
 * @param {string} name - Candidate ARIA attribute name.
 * @returns {boolean} Whether the name and spelling are standard.
 */
function isStandardARIAAttribute(name) {
    return ariaAttributePattern.test(name) === true
        && standardARIAAttributes.has(name) === true
} //:: isStandardARIAAttribute

/**
 * @description Determines whether a data-* name follows the HTML naming contract.
 * @param {string} name - Candidate custom data attribute name.
 * @returns {boolean} Whether the name can be a standard data attribute.
 */
function isStandardDataAttribute(name) {
    return dataAttributePattern.test(name) === true
        && uppercaseASCIINamePattern.test(name) === false
} //:: isStandardDataAttribute

/**
 * @description Calls setAttribute only with an exact string supplied by the caller.
 * @param {Element} element - Element receiving the content attribute.
 * @param {string} name - Standard HTML, WAI-ARIA, or data-* attribute name.
 * @param {unknown} value - Value that must already be a string.
 * @returns {void} Nothing.
 * @throws {TypeError} If the name is unsupported or the value is not a string.
 */
function setAttribute(element, name, value) {
    validateAttributeName(name)
    validateAttributeValue(name, value)

    element.setAttribute(name, value)
} //:: setAttribute

/**
 * @description Requires a native content attribute value to be an exact string.
 * @param {string} name - Attribute name for diagnostics.
 * @param {unknown} value - Candidate attribute value.
 * @returns {void} Nothing.
 * @throws {TypeError} If value is not a string.
 */
function validateAttributeValue(name, value) {
    if (typeof value !== 'string') {
        throw new TypeError(`HTML attribute requires a string: ${name}`)
    }
} //:: validateAttributeValue
