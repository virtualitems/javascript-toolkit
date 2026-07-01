ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

function useLogger() {
  return React.useCallback((message) => console.log(message), []);
}

function useCounter(initial = 0) {
  const [count, setCount] = React.useState(initial);
  const increment = React.useCallback(() => setCount(prev => prev + 1), []);
  return [count, increment];
}

function App() {
  const [count, increment] = useCounter(0);
  const logger = useLogger();

  logger(`Count: ${count}`);
  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>{count}</p>
    </div>
  );
}
