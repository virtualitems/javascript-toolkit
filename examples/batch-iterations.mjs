const csv = [
  ['item', 'Price', 'Quantity'],
  ['Item A', 10, 2],
  ['Item B', 15, 5],
  ['Item C', 20, 3],
  ['Item D', 25, 4]
]

function makeInvoice(rows) {
  const items = new Array(rows.length)
  let total = 0

  for (let i = 0, end = rows.length; i < end; i += 1) {
    const [item, price, quantity] = rows[i]
    items[i] = { item, price, quantity, total: price * quantity }
    total += items[i].total
  }

  return { items, total }
}

console.log(makeInvoice(csv.slice(1)))
