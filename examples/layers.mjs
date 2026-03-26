/**
 * Operación de dominio para dividir dos números.
 *
 * Valida que ambos argumentos sean números finitos y que el divisor
 * sea distinto de 0.
 *
 * @param {number} n1 Dividendo.
 * @param {number} n2 Divisor.
 * @returns {number} Cociente de n1 entre n2.
 * @throws {TypeError} Si n1 o n2 no son números finitos.
 * @throws {RangeError} Si n2 es 0.
 */
function div(n1, n2) {
  if (Number.isFinite(n1) === false) {
    throw new TypeError('The first argument must be a valid number')
  }

  if (Number.isFinite(n2) === false) {
    throw new TypeError('The second argument must be a valid number')
  }

  if (n2 === 0) {
    throw new RangeError('Cannot divide by zero')
  }

  return n1 / n2
}

/**
 * Operación de dominio para sumar una lista de números.
 *
 * Requiere al menos un argumento y valida que todos sean números finitos.
 *
 * @param {...number} args Valores a sumar.
 * @returns {number} Suma total.
 * @throws {TypeError} Si no se recibe ningún argumento.
 * @throws {TypeError} Si algún argumento no es un número finito.
 */
function sum(...args) {
  if (args.length === 0) {
    throw new TypeError('At least one argument is required')
  }

  if (args.some((arg) => Number.isFinite(arg) === false)) {
    throw new TypeError('All arguments must be valid numbers')
  }

  return args.reduce((acc, curr) => acc + curr, 0)
}

/**
 * Caso de uso de aplicación para calcular el promedio de tres valores.
 *
 * Valida la estructura del objeto de entrada para ejecutar el caseo de uso
 * y delega el cálculo a las funciones de dominio `sum()` y `div()`.
 *
 * @param {{n1: number, n2: number, n3: number}} data Datos de entrada.
 * @returns {number} Promedio de n1, n2 y n3.
 * @throws {TypeError} Si `data` no es un objeto plano.
 * @throws {TypeError} Si faltan `n1`, `n2` o `n3`.
 * @throws {TypeError|RangeError} Si `sum()` o `div()` lanzan un error.
 */
function avgService(data) {
  if (
    data === undefined ||
    data === null ||
    Object.getPrototypeOf(data) !== Object.prototype
  ) {
    throw new TypeError('Data must be a plain object')
  }

  if (
    Object.hasOwn(data, 'n1') === false ||
    Object.hasOwn(data, 'n2') === false ||
    Object.hasOwn(data, 'n3') === false
  ) {
    throw new TypeError('Data must have n1, n2 and n3 properties')
  }

  const sumResult = sum(data.n1, data.n2, data.n3)
  const divResult = div(sumResult, 3)

  return divResult
}

/**
 * Punto de entrada de la capa de presentación.
 *
 * Genera datos, ejecuta el caso de uso `avgService()` e interactúa
 * con el usuario mostrando el resultado o el error en consola.
 *
 * @returns {void}
 */
function main() {
  const n1 = Math.floor(Math.random() * 10)
  const n2 = Math.floor(Math.random() * 10)
  const n3 = Math.floor(Math.random() * 10)

  try {
    const result = avgService({ n1, n2, n3 })
    console.log(`The average of ${n1}, ${n2} and ${n3} is ${result.toFixed(2)}`)
  } catch (error) {
    console.log(`Cannot calculate the average: ${error.message}`)
  }
}

main()
