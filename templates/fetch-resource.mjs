function transform() {}

function use() {}

function clean() {}

fetch('https://example.org', { method: 'GET' })
    .then(
        (res) => res.ok ? res.json() : Promise.reject(new Error(res.statusText)), // receive
        console.warn // on fetch error
    )
    .then(
        transform,
        console.warn // on receive error
    )
    .then(
        use,
        console.warn // on transform error
    )
    .catch(console.warn) // on use error
    .finally(clean)
