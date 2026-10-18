export class Subject {
    #current
    #channel

    constructor(initial) {
        this.#current = initial
        this.#channel = new EventTarget()
    }

    current() {
        return this.#current
    }

    /**
     * @param {unknown} value
     * @param {undefined | EventInit} eventInit
     */
    set(value, eventInit = undefined) {
        this.#current = value
        const detail = this.#current
        const payload = Object.assign({ detail }, eventInit)
        const event = new CustomEvent('change', payload)
        this.#channel.dispatchEvent(event)
    }

    /**
     * @param {unknown} value
     * @param {undefined | EventInit} eventInit
     */
    update(updater, eventInit = undefined) {
        this.#current = updater(this.#current)
        const detail = this.#current
        const payload = Object.assign({ detail }, eventInit)
        const event = new CustomEvent('change', payload)
        this.#channel.dispatchEvent(event)
    }

    /**
     * @param {string} type
     * @param {null | EventListenerOrEventListenerObject} listener
     * @param {boolean | AddEventListenerOptions} options
     */
    addEventListener(type, listener, options) {
        this.#channel.addEventListener(type, listener, options)
    }

    /**
     * @param {string} type
     * @param {null | EventListenerOrEventListenerObject} listener
     * @param {boolean | EventListenerOptions} options
     */
    removeEventListener(type, listener, options) {
        this.#channel.addEventListener(type, listener, options)
    }
}
