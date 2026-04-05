import {
  useSyncExternalStore,
  createElement as h,
  Fragment
} from 'https://esm.sh/react@19'

import { createRoot } from 'https://esm.sh/react-dom@19/client'

import { createStore } from 'https://esm.sh/zustand/vanilla'

// EXTERNAL STORE

function createCounterStore() {
  const store = createStore(() => ({ count: 0 }))
  const { getState, setState } = store

  const increment = () => {
    const state = Object.assign({}, getState())
    state.count = state.count + 1
    setState(state)
  }

  const decrement = () => {
    const state = Object.assign({}, getState())
    state.count = state.count - 1
    setState(state)
  }

  const reset = () => {
    const state = Object.assign({}, getState())
    state.count = 0
    setState(state)
  }

  return {
    store,
    increment,
    decrement,
    reset
  }
}

const counterStore = createCounterStore()

// REACT COMPONENT

function Counter() {
  const { count } = useSyncExternalStore(
    counterStore.store.subscribe,
    counterStore.store.getState
  )

  return h(
    'div',
    { style: { fontFamily: 'sans-serif', textAlign: 'center', marginTop: '2rem' } },
    h('h1', null, `Count: ${count}`),
    h(
      'div',
      { style: { display: 'flex', gap: '0.5rem', justifyContent: 'center' } },
      h('button', { onClick: counterStore.decrement }, 'Decrement'),
      h('button', { onClick: counterStore.reset }, 'Reset'),
      h('button', { onClick: counterStore.increment }, 'Increment')
    )
  )
}

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

const node = h(Fragment, null, h(Counter), h(Counter))

root.render(node)
