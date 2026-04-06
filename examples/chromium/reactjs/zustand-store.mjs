import {
  createElement as h,
  Fragment
} from 'https://esm.sh/react@19'

import { createRoot } from 'https://esm.sh/react-dom@19/client'

import { create } from 'https://esm.sh/zustand/'

// ZUSTAND STORE

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}))

// REACT COMPONENT

function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return h(
    'div',
    { style: { fontFamily: 'sans-serif', textAlign: 'center', marginTop: '2rem' } },
    h('h1', null, `Count: ${count}`),
    h(
      'div',
      { style: { display: 'flex', gap: '0.5rem', justifyContent: 'center' } },
      h('button', { onClick: decrement }, 'Decrement'),
      h('button', { onClick: reset }, 'Reset'),
      h('button', { onClick: increment }, 'Increment')
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
