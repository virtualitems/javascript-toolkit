// @ts-check
/// <reference types="vite/client" />
/// <reference path="./globals.d.ts" />

import styles from './styles.module.css'

const mainElement = document.querySelector('main')

if (mainElement === null) {
  throw new Error('No se encontró el elemento <main>')
}

const counterElement = document.getElementById('counter')

if (counterElement === null) {
  throw new Error('No se encontró el elemento #counter')
}

const outputElement = mainElement.querySelector('output')

if (outputElement === null) {
  throw new Error('No se encontró el elemento <output>')
}

const increaseButton = mainElement.querySelector('[data-action="increment"]')

if (increaseButton === null) {
  throw new Error('No se encontró el botón +1')
}

const decreaseButton = mainElement.querySelector('[data-action="decrement"]')

if (decreaseButton === null) {
  throw new Error('No se encontró el botón -1')
}

const resetButton = mainElement.querySelector('[data-action="reset"]')

if (resetButton === null) {
  throw new Error('No se encontró el botón Reset')
}

const appVersionElement = document.getElementById('app-version')

if (appVersionElement === null) {
  throw new Error('No se encontró el elemento #app-version')
}

appVersionElement.textContent = APP_VERSION

mainElement.classList.add(styles.calculator)
outputElement.classList.add(styles.display)
counterElement.classList.add(styles.value)

increaseButton.classList.add(styles.button, styles.primary)
decreaseButton.classList.add(styles.button)
resetButton.classList.add(styles.button, styles.ghost)

let counterValue = 0

const renderCounter = () => {
  counterElement.textContent = String(counterValue)
}

increaseButton.addEventListener('click', () => {
  counterValue += 1
  renderCounter()
})

decreaseButton.addEventListener('click', () => {
  counterValue -= 1
  renderCounter()
})

resetButton.addEventListener('click', () => {
  counterValue = 0
  renderCounter()
})

renderCounter()
