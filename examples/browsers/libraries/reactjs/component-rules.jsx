// los componentes se crean con la palabra function
// los export siempre sin default
// el componente que crea el estado no es el que consume el estado
// el componente que crea el estado envía el estado a consumir a otros componentes
function Table() {

  // el estado va primero
  const [contents, setContents] = React.useState([]);

  // efectos va segundo
  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(json => {
        const users = json.data;
        const contents = users.map((user) => [
          user.id,
          user.email,
          user.first_name,
          user.last_name
        ]);
        setContents(contents);
      });
  }, []);

  // las funciones van tercero
  // funciones dentro de funciones con arrow functions
  const handleClieck = React.useCallback((event) => {
    console.log(event.target);
  });

  // los datos estáticos van cuarto
  const headers = [
    'ID',
    'Email',
    'First Name',
    'Last Name'
  ];

  // el renderizado va al final
  return (
    <table style={{ width: '100%' }} onClick={handleClieck}>
      <TableHdeaders headers={headers} />
      <TableContents contents={contents} />
    </table>
  );
}


// los elementos visuales son stateless
// las iteraciones se hacen en un componente aparte
// callbacks con arrow functions
function TableHdeaders({ headers = [] }) {
  return (
    <thead>
      <tr>
        {headers.map(
          (header, index) => <th key={index}>{header}</th>
        )}
      </tr>
    </thead>
  );
}


// no pueden haber iteraciones anidadas
function TableContents({ contents = [] }) {
  return (
    <tbody>
      {contents.map(
        (content, index) => <TableContentRow key={index} content={content} />
      )}
    </tbody>
  );
}


function TableContentRow({ content = [] }) {
  return (
    <tr>
      {content.map(
        (data, index) => <td key={index}>{data}</td>
      )}
    </tr>
  );
}


const rootElement = document.getElementById('root');

// siempre validar si el elemento existe
if (rootElement === null) {
  throw new Error('No existe el elemento con id "root"');
}

ReactDOM.createRoot(rootElement).render(<Table />);
