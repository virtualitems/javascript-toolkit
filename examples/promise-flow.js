Promise.resolve(true).then((result) => console.log('resolved', result))

Promise.all([Promise.resolve(true), Promise.resolve(false)]).then((results) =>
  console.log('All promises resolved', results)
)

Promise.allSettled([Promise.resolve(true), Promise.resolve(false)]).then((results) =>
  console.log('All promises settled', results)
)

Promise.race([Promise.resolve(true), Promise.reject('error')])
  .then((result) => console.log('First promise resolved', result))
  .catch((error) => console.error('First promise rejected', error))

Promise.reject('error')
  .then((result) => console.log('This will not be called', result))
  .catch((error) => console.error('Promise rejected', error))

Promise.any([Promise.resolve(true), Promise.reject('error')])
  .then((result) => console.log('Any promise resolved', result))
  .catch((error) => console.error('All promises rejected', error))

const { promise, resolve, reject } = Promise.withResolvers()

resolve(true) // reject('error')

promise
  .then((result) => console.log('Promise with resolvers resolved', result))
  .catch((error) => console.error('Promise with resolvers rejected', error))
