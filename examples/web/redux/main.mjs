// @ts-check

import { configureStore, createSlice } from 'https://esm.sh/@reduxjs/toolkit'

/* CREATE SLICE AND STORE */

const slice = createSlice({
  name: 'counter',

  initialState: {
    count: 0
  },

  reducers: {
    increment(state) {
      state.count += 1
    },

    decrement(state) {
      state.count -= 1
    },

    reset(state) {
      state.count = 0
    }
  }
})

const store = configureStore({
  reducer: slice.reducer
})

/* CONNECT REDUX TO DOM */

function render() {
  const display = document.getElementById('display')
  if (display === null) throw new Error('Missing display element')
  display.textContent = String(store.getState().count)
}

store.subscribe(render)

render()

/* CONNECT DOM TO REDUX */

const incrementBtn = document.getElementById('increment')
const decrementBtn = document.getElementById('decrement')
const resetBtn = document.getElementById('reset')
const display = document.getElementById('display')

if (
  incrementBtn === null ||
  decrementBtn === null ||
  resetBtn === null ||
  display === null
) {
  throw new Error('Missing DOM elements')
}

incrementBtn.addEventListener('click', () => store.dispatch(slice.actions.increment()))

decrementBtn.addEventListener('click', () => store.dispatch(slice.actions.decrement()))

resetBtn.addEventListener('click', () => store.dispatch(slice.actions.reset()))
