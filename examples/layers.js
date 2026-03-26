/**
 * Capa de dominio.
 *
 * Responsabilidad:
 * - Contener la regla de negocio de la división.
 * - Proteger el contrato de la operación.
 *
 * Esta función no sabe nada de:
 * - objetos de entrada;
 * - consola;
 * - interfaz;
 * - flujo de la aplicación.
 *
 * Solo conoce la operación "dividir" y sus reglas:
 * - ambos argumentos deben ser números finitos;
 * - el denominador no puede ser 0.
 *
 * Eso la hace reutilizable desde cualquier capa superior.
 *
 * @param {number} n1
 * @param {number} n2
 * @returns {number}
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
 * Capa de aplicación.
 *
 * Responsabilidad:
 * - Recibir la entrada de la capa superior.
 * - Validar la forma de los datos.
 * - Orquestar la llamada a la lógica de dominio.
 *
 * Esta función no presenta resultados ni errores al usuario.
 * Tampoco implementa la regla matemática de la división.
 *
 * Su trabajo es validar la estructura del input:
 * - que "data" sea un objeto plano;
 * - que existan las propiedades n1 y n2.
 *
 * Después delega la validación del valor y la operación real
 * a la capa de dominio, llamando a div().
 *
 * @param {{n1: number, n2: number}} data
 * @returns {number}
 * @throws {TypeError} Si data no es un objeto plano.
 * @throws {TypeError} Si faltan las propiedades n1 o n2.
 * @throws {TypeError|RangeError} Propaga los errores lanzados por div().
 */
function service(data) {
  if (
    data === undefined ||
    data === null ||
    Object.getPrototypeOf(data) !== Object.prototype
  ) {
    throw new TypeError('Data must be a plain object')
  }

  if (Object.hasOwn(data, 'n1') === false || Object.hasOwn(data, 'n2') === false) {
    throw new TypeError('Data must have n1 and n2 properties')
  }

  return div(data.n1, data.n2)
}

/**
 * Capa de presentación.
 *
 * Responsabilidad:
 * - Obtener o preparar los datos de entrada.
 * - Invocar la capa de aplicación.
 * - Mostrar el resultado o el error.
 *
 * Esta función sí conoce detalles de salida, como console.log.
 * Pero no conoce la implementación interna de la regla de negocio.
 *
 * La dependencia va hacia abajo:
 * - main() usa service()
 * - service() usa div()
 * - div() no conoce a las capas superiores
 *
 * Esa dirección evita acoplamiento entre capas.
 *
 * @returns {void}
 */
function main() {
  const n1 = Math.floor(Math.random() * 10)
  const n2 = Math.floor(Math.random() * 10)

  try {
    const result = service({ n1, n2 })
    console.log(`The result of dividing ${n1} by ${n2} is ${result}`)
  } catch (error) {
    console.log(`Cannot divide ${n1} by ${n2}: ${error.message}`)
  }
}

main()
