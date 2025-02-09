import * as Redux from './redux.browser.mjs';


const initialState = { count: 0 };


function reducer(state=initialState, action) {
  const newState = { ...state };

  if (action.type === 'INCREMENT') {
    newState.count += 1;
  }

  else if (action.type === 'DECREMENT') {
    newState.count -= 1;
  }

  else if (action.type === 'RESET') {
    newState.count = 0;
  }

  return newState;
}


const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');
const display = document.getElementById('display');

const store = Redux.createStore(reducer);


display.textContent = store.getState().count;


increment.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});

decrement.addEventListener('click', () => {
  store.dispatch({ type: 'DECREMENT' });
});

reset.addEventListener('click', () => {
  store.dispatch({ type: 'RESET' });
});

store.subscribe(() => {
  display.textContent = store.getState().count;
});
