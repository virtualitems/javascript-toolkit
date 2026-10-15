const SET_ACTION = 'set_action'

const UPDATE_ACTION = 'update_action'

export class State {
    #value
    #queue = []

    constructor(value) {
        this.#value = value
    }

    get value() {
        return this.#value
    }

    set(value) {
        this.#schedule(SET_ACTION, value)
    }

    update(updater) {
        if (typeof updater !== 'function') {
            throw new TypeError('Updater must be a function')
        }

        this.#schedule(UPDATE_ACTION, updater)
    }

    #consume() {
        while (this.#queue.length > 0) {
            const item = this.#queue[0]
            const { action, details } = item

            switch (action) {
                case SET_ACTION: {
                    this.#value = details[0]
                    break
                }

                case UPDATE_ACTION: {
                    const updater = details[0]
                    this.#value = updater(this.#value)
                    break
                }

                default:
                    throw new TypeError('Unknown state action')
            }

            this.#queue.shift()
        }
    }

    #schedule(action, ...details) {
        const isIdle = this.#queue.length === 0

        this.#queue.push({
            action,
            details
        })

        if (isIdle === true) {
            this.#consume()
        }
    }
}
