/**
 * @template T
 * @description Holds a single synchronous value with controlled mutation.
 */
export class State {
    /**
     * @description Creates a State instance with the given initial value.
     * @param {T} initial - The initial value.
     */
    constructor(initial) {
        /** @type {T} */
        this.current = initial
    }

    /**
     * @description Replaces the current value.
     * @param {T} value - The new value.
     * @returns {T} The updated value.
     */
    set(value) {
        this.current = value

        return this.current
    }

    /**
     * @description Derives the next value from the current one.
     * @param {function(T): T} updater - Receives the previous value and returns the next.
     * @returns {T} The updated value.
     */
    update(updater) {
        this.current = updater(this.current)

        return this.current
    }
}

/**
 * @template T
 * @description Holds a single asynchronous value with serialized mutation.
 */
export class AsyncState {
    /**
     * @description Creates an AsyncState instance with the given initial value.
     * @param {T} initial - The initial value.
     */
    constructor(initial) {
        /** @type {Promise<Awaited<T>>} */
        this.current = Promise.resolve(initial)
    }

    /**
     * @description Replaces the current value with a resolved promise.
     * @param {T} value - The new value.
     * @returns {Promise<Awaited<T>>} A promise that resolves to the updated value.
     */
    set(value) {
        this.current = Promise.resolve(value)

        return this.current
    }

    /**
     * @description Chains an updater onto the current promise, serializing mutations.
     * @param {function(Awaited<T>): Awaited<T>} updater - Receives the resolved value and returns the next.
     * @returns {Promise<Awaited<T>>} A promise that resolves to the updated value.
     */
    update(updater) {
        this.current = this.current.then(updater)

        return this.current
    }
}
