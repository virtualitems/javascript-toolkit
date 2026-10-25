export function dict(template) {
    const instance = Object.create(null)
    Object.assign(instance, template)
    return instance
}

dict.fromEntries = function fromEntries(entries) {
    const instance = Object.create(null)
    for (const [key, value] of entries) {
        instance[key] = value
    }
    return instance
}
