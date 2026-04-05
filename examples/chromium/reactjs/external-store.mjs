import { useSyncExternalStore, createElement, Fragment } from 'https://esm.sh/react@19'
import { createRoot } from 'https://esm.sh/react-dom@19/client'

import { createStore } from 'https://esm.sh/zustand/vanilla'

// EXTERNAL STORE

const store = createStore(() => ({ count: 0 }))

const getState = store.getState

const subscribe = store.subscribe

function increment() {
  const state = store.getState()
  store.setState({ count: state.count + 1 })
}

function decrement() {
  const state = store.getState()
  store.setState({ count: state.count - 1 })
}

function reset() {
  store.setState({ count: 0 })
}

// REACT COMPONENT

function Counter() {
  const { count } = useSyncExternalStore(subscribe, getState)

  return createElement(
    'div',
    { style: { fontFamily: 'sans-serif', textAlign: 'center', marginTop: '2rem' } },
    createElement('h1', null, `Count: ${count}`),
    createElement(
      'div',
      { style: { display: 'flex', gap: '0.5rem', justifyContent: 'center' } },
      createElement('button', { onClick: decrement }, 'Decrement'),
      createElement('button', { onClick: reset }, 'Reset'),
      createElement('button', { onClick: increment }, 'Increment')
    )
  )
}

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

const fragment = createElement(
  Fragment,
  null,
  createElement(Counter),
  createElement(Counter)
)

root.render(fragment)
