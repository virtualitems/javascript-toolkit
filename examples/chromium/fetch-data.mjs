class Geo {
  constructor(lat, lng) {
    this.lat = lat
    this.lng = lng
  }
}

class Address {
  constructor(street, suite, city, zipcode, geo) {
    this.street = street
    this.suite = suite
    this.city = city
    this.zipcode = zipcode
    this.geo = geo
  }
}

class Company {
  constructor(name, catchPhrase, bs) {
    this.name = name
    this.catchPhrase = catchPhrase
    this.bs = bs
  }
}

class User {
  constructor(id, name, username, email, phone, website, company, address) {
    this.id = id
    this.name = name
    this.username = username
    this.email = email
    this.phone = phone
    this.website = website
    this.company = company
    this.address = address
  }
}

class Aggregate {
  static createGeo(data) {
    if (data === null || data === undefined) return null
    return new Geo(data.lat, data.lng)
  }

  static createCompany(data) {
    if (data === null || data === undefined) return null
    return new Company(data.name, data.catchPhrase, data.bs)
  }

  static createAddress(data) {
    if (data === null || data === undefined) return null
    const geo = Aggregate.createGeo(data.geo)
    return new Address(data.street, data.suite, data.city, data.zipcode, geo)
  }

  static createUser(data) {
    const company = Aggregate.createCompany(data.company)
    const address = Aggregate.createAddress(data.address)
    return new User(
      data.id,
      data.name,
      data.username,
      data.email,
      data.phone,
      data.website,
      company,
      address
    )
  }
}

/**
 * @param {RequestInfo} target
 * @param {RequestInit?} options
 */
async function fetchUsers(target, options) {
  // request phase
  const response = await fetch(target, options)
  if (response.ok === false) throw new Error(response.statusText)

  // decode phase
  const json = await response.json()
  if (Array.isArray(json) === false) throw new Error('Expected data to be an array')

  // transform phase
  const users = json.map(Aggregate.createUser)
  return users
}

async function main() {
  // prepare phase
  const target = new URL('https://jsonplaceholder.typicode.com/users/')

  const options = {
    method: 'GET',
    cors: 'cors',
    headers: new Headers({
      'Cache-Control': 'no-store',
      'Content-Language': 'en-US',
      Accept: 'application/json',
      'Accept-Language': 'en-US'
    })
  }

  try {
    const users = await fetchUsers(target, options)
    console.log(users[0])
  } catch (error) {
    console.error(error)
  }
}

main()
