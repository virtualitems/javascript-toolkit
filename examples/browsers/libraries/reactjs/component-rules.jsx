// los componentes se crean con la palabra function
// los export siempre sin default
// el componente que crea el estado no es el que consume el estado
// el componente que crea el estado envía el estado a consumir a otros componentes
function Table() {

  // el estado va primero
  const [contents, setContents] = React.useState([]);

  // los datos estáticos segundo
  const headers = [
    'ID',
    'Email',
    'First Name',
    'Last Name',
    'Delete',
  ];

  // efectos va tercero
  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(json => setContents(json.data));
  }, []);

  // las funciones van cuarto
  // funciones dentro de funciones con arrow functions
  const removeItem = React.useCallback((idx) => {
    // los elementos del estado se eliminan con splice, no con filter
    // el índice lo da el método map al renderizar
    // solución O(1)
    contents.splice(idx, 1);
    setContents([...contents]);
  });

  // el renderizado va al final
  return (
    <table style={{ width: '100%' }}>
      <TableHdeaders headers={headers} />
      <TableContents contents={contents} removeItem={removeItem} />
    </table>
  );

}


// los elementos visuales son stateless
// las iteraciones se hacen en un componente aparte
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


// no pueden haber iteraciones anidadas
function TableContents({ contents, removeItem }) {
  return (
    <tbody>
      {contents.map((content, idx) => (
        <tr key={content.id}>
          <td>{content.id}</td>
          <td>{content.email}</td>
          <td>{content.first_name}</td>
          <td>{content.last_name}</td>
          <td><button onClick={() => removeItem(idx)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(<Table />);
