/*
import { State } from './state.mjs'

function add10(prev) {
    return prev + 10
}

function mul10(prev) {
    return prev * 10
}

const state = new State(0)

await state.set(10)

await Promise.all([
    state.update(add10),
    state.update(mul10)
])

console.log(state.value)
*/

/**
 * @description Defines the operation contract used by the state queue.
 */
class StateOperation {
    /**
     * @description Prevents direct construction of the abstract operation.
     * @throws {TypeError} Thrown when the abstract class is instantiated directly.
     */
    constructor() {
        if (new.target === StateOperation) {
            throw new TypeError('StateOperation is abstract')
        }
    }

    /**
     * @description Applies the concrete state operation.
     * @throws {Error} Thrown because subclasses must implement this method.
     * @returns {any | Promise<any>} The next state value or a promise for it.
     */
    apply() {
        throw new Error('StateOperation.apply must be implemented')
    }
}

/**
 * @description Replaces the current state value with a specified value.
 */
class Assignment extends StateOperation {
    #value

    /**
     * @description Creates an assignment operation with its pending value.
     * @param {any} value - The replacement state value.
     */
    constructor(value) {
        super()

        this.#value = value
    }

    /**
     * @description Returns the stored replacement state value.
     * @returns {any} The replacement state value.
     */
    apply() {
        return this.#value
    }
}

/**
 * @description Produces the next state value by invoking an updater.
 */
class Transform extends StateOperation {
    #state
    #updater

    /**
     * @description Creates a transformation operation with its pending updater.
     * @param {{readonly value: any}} state - The state whose current value will be transformed.
     * @param {(value: any) => any | Promise<any>} updater - The state transformation.
     */
    constructor(state, updater) {
        super()

        this.#state = state
        this.#updater = updater
    }

    /**
     * @description Applies the stored updater to the current state value.
     * @throws {Error} Propagates an error thrown synchronously by the updater.
     * @returns {any | Promise<any>} The updated value or a promise for it.
     */
    apply() {
        return this.#updater(this.#state.value)
    }
}

/**
 * @description Stores a value of any type and applies queued state changes in order.
 */
export class State {
    #value
    #queue = []

    /**
     * @description Processes all queued state changes sequentially.
     * @returns {Promise<void>} A promise that resolves after the queue is empty.
     */
    #consume = async () => {
        while (this.#queue.length > 0) {
            const item = this.#queue[0]

            try {
                const value = await item.operation.apply()

                this.#value = value
                item.resolve(value)
            }
            catch (error) {
                item.reject(error)
            }
            finally {
                this.#queue.shift()
            }
        }
    }

    /**
     * @description Creates state with an initial value of any type.
     * @param {any} value - The initial state value.
     */
    constructor(value) {
        this.#value = value
    }

    /**
     * @description Gets the current state value.
     * @returns {any} The current state value.
     */
    get value() {
        return this.#value
    }

    /**
     * @description Queues replacement of the current state value.
     * @param {any} value - The replacement state value.
     * @returns {Promise<any>} A promise that resolves with the replacement value.
     */
    set(value) {
        const operation = new Assignment(value)

        return this.#schedule(operation)
    }

    /**
     * @description Queues a transformation of the current state value.
     * @param {(value: any) => any | Promise<any>} updater - The state transformation.
     * @throws {TypeError} Thrown when the updater is not a function.
     * @returns {Promise<any>} A promise that resolves with the updated value and rejects if the updater fails.
     */
    update(updater) {
        if (typeof updater !== 'function') {
            throw new TypeError('Updater must be a function')
        }

        const operation = new Transform(this, updater)

        return this.#schedule(operation)
    }

    /**
     * @description Appends a state change to the processing queue.
     * @param {StateOperation} operation - A concrete state operation.
     * @throws {TypeError} Thrown when the value is not a StateOperation instance.
     * @returns {Promise<any>} A promise that settles with the queued operation.
     */
    #schedule(operation) {
        if (operation instanceof StateOperation === false) {
            throw new TypeError('Operation must extend StateOperation')
        }

        const { promise, resolve, reject } = Promise.withResolvers()

        const item = {
            operation,
            resolve,
            reject
        }

        const idle = this.#queue.length === 0

        this.#queue.push(item)

        if (idle) {
            queueMicrotask(this.#consume)
        }

        return promise
    }
}
