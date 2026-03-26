function forLoop(arr) {
  console.log('for')

  for (let i = 0, end = arr.length; i < end; i += 1) {
    const element = arr[i]
    console.log(element)
  }
}

function forOfLoop(arr) {
  console.log('for of')

  for (const element of arr) {
    console.log(element)
  }
}

function forInLoop(obj) {
  console.log('for in')

  for (const key in obj) {
    const element = obj[key]
    console.log(element)
  }
}

function whileLoop(arr) {
  console.log('while')

  let index = 0
  const end = arr.length

  while (index < end) {
    const element = arr[index]
    console.log(element)
    index += 1
  }
}

function doWhileLoop(arr) {
  console.log('do while')

  let index = 0
  const end = arr.length

  do {
    const element = arr[index]
    console.log(element)
    index += 1
  } while (index < end)
}

function forEachLoop(arr) {
  console.log('forEach')

  arr.forEach((element) => {
    console.log(element)
  })
}

function forOfPromiseLoop(arr) {
  console.log('for of promise')
  for (const element of arr) {
    new Promise((done) => {
      console.log(element)
      done()
    })
  }
}

async function forAwaitOfLoop(arr) {
  console.log('for await of')

  for await (const element of arr) {
    console.log(element)
  }
}

const list = [1, 2, 3, 4]
const object = { one: 1, two: 2, three: 3, four: 4 }

forLoop(list)
forOfLoop(list)
forInLoop(object)
whileLoop(list)
doWhileLoop(list)
forEachLoop(list)
forOfPromiseLoop(list)
forAwaitOfLoop(list)
