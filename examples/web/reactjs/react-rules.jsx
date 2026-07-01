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
      <thead>
        <tr>
          {/*
          // las iteraciones se hacen en el componente que recibe el iterable
          // los callbacks se hacen con arrow functions
          // la función map retorna siempre un único elemento
          // no pueden haber iteraciones anidadas, en ese caso se crean componentes aparte
          */}
          {headers.map((text, idx) => <th key={idx}>{text}</th>)}
        </tr>
      </thead>
      <tbody>
        {/*
        // la función map retorna siempre un único elemento
        // si el elemento es complejo, se crea un componente aparte
        // el estado es una lista por lo que cada elemento tiene un índice
        // se usa el índice para modificar o eliminar un elemento
        // los eventos empiezan con el prefijo "on"
        */}
        {contents.map((content, idx) => (
          <UserRow
            key={content.id}
            content={content}
            onUpdate={() => updateItem(idx)}
            onRemove={() => removeItem(idx)}
          />
        ))}
      </tbody>
    </table>
  );
}


// no se crea un estado en un componente que consume un estado
// los componentes que consumen un estado, pueden recibir funciones para modificarlo
function UserRow({ content, onUpdate, onRemove }) {
  return (
    <tr>
      <td>{content.id}</td>
      <td>{content.email}</td>
      <td>{content.first_name}</td>
      <td>{content.last_name}</td>
      <td><button onClick={onUpdate}>Update</button></td>
      <td><button onClick={onRemove}>Delete</button></td>
    </tr>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);
