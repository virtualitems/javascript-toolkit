fetch('https://example.org', { method: 'GET' })
    .then(
        (res) => res.ok ? res.json() : Promise.reject(new Error(res.statusText)), // receive
        console.warn // on fetch error
    )
    .then(
        (json) => {
          return json  // transform
        },
        console.warn // on receive error
    )
    .then(
        (objects) => {
          return objects  // use
        },
        console.warn // on transform error
    )
    .catch(console.warn) // on use error
