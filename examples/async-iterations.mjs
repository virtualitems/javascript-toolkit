class Item {
  constructor(name, price, quantity) {
    this.name = name
    this.price = price
    this.quantity = quantity
    this.total = price * quantity
  }
}

class Invoice {
  constructor() {
    this.items = []
    this.total = 0
  }

  addItem(item) {
    this.items.push(item)
    this.total += item.total
  }
}

function executor([item, price, quantity]) {
  return new Item(item, price, quantity)
}

function aggregator(items) {
  const invoice = new Invoice()
  for (const item of items) invoice.addItem(item)
  return invoice
}

const csv = [
  ['item', 'Price', 'Quantity'],
  ['Item A', 10, 2],
  ['Item B', 15, 5],
  ['Item C', 20, 3],
  ['Item D', 25, 4]
]

const promises = []

for (let i = 1, end = csv.length; i < end; i += 1) {
  promises.push(Promise.resolve(csv[i]).then(executor))
}

Promise.all(promises).then(aggregator).then(console.log).catch(console.error)
