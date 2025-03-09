// los componentes se crean con la palabra function
// los export siempre sin default
function App() {

  // el estado va primero
  const [contents, setContents] = React.useState([]);

  // los datos estáticos segundo
  const headers = [
    'ID',
    'Email',
    'First Name',
    'Last Name',
    'Buttons',
  ];

  // efectos va tercero
  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(json => setContents(json.data));
  }, []);

  // las funciones van cuarto
  // funciones dentro de funciones con arrow functions
  // las funciones para modificar el estado se declaran en el mismo componente que crea el estado
  const removeItem = React.useCallback((idx) => {
    // los elementos del estado se eliminan con splice, no con filter
    // el índice lo da el método map al renderizar
    // solución O(1)
    contents.splice(idx, 1);
    setContents([...contents]);
  });

  // las funciones para modificar el estado se declaran en el mismo componente que crea el estado
  const updateItem = React.useCallback((idx) => {
    // los elementos del estado se modifican accediendo directamente
    // el índice lo da el método map al renderizar
    // solución O(1)
    contents[idx].email += ' (updated)';
    setContents([...contents]);
  });

  // el renderizado va al final
  // el componente que crea el estado no es el que consume el estado
  // el componente que crea el estado envía el estado a consumir a otros componentes
  // para modificar el estado, se crean funciones y se envían como props
  // los elementos que crean estados nunca renderizan en componentes no controlados
  return (
    <Table headers={headers} contents={contents} updateItem={updateItem} removeItem={removeItem} />
  );
}


// los elementos visuales son stateless
// los elementos visuales se caracterizan por renderizar componentes no controlados
function Table({ headers, contents, updateItem, removeItem }) {
  return (
    <table style={{ width: '100%' }}>
      <TableHdeaders headers={headers} />
      <TableContents contents={contents} updateItem={updateItem} removeItem={removeItem} />
    </table>
  );
}


// las iteraciones se hacen en un componente aparte con su correspondiente componente raíz
// no pueden haber iteraciones anidadas, en ese caso se crean componentes aparte
// los callbacks se hacen con arrow functions
function TableHdeaders({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((text, idx) => <th key={idx}>{text}</th>)}
      </tr>
    </thead>
  );
}


// no se crea un estado en un componente que consume un estado
// los componentes que consumen un estado, pueden recibir funciones para modificarlo
function TableContents({ contents, updateItem, removeItem }) {
  return (
    <tbody>
      {contents.map((content, idx) => (
        <tr key={content.id}>
          <td>{content.id}</td>
          <td>{content.email}</td>
          <td>{content.first_name}</td>
          <td>{content.last_name}</td>
          <td><button onClick={() => updateItem(idx)}>Update</button></td>
          <td><button onClick={() => removeItem(idx)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);
