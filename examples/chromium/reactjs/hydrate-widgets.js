import React from 'https://esm.sh/react@19?dev';

export function Button() {
  return React.createElement(
    'button',
    { onClick: () => console.log('Botón React presionado 2') },
    'React',
  );
}

export function Table({ users }) {
  const [usersList, setUsersList] = React.useState([]);
  const countRef = React.useRef(0);

    React.useEffect(() => {
    setUsersList(users);
  }, [users]);

  const fetchUsers = React.useCallback(() => {
    countRef.current += 1;

    fetch('https://reqres.in/api/users?per_page=2&page=' + countRef.current, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': 'reqres-free-v1',
      },
    })
      .then(response => response.json())
      .then(json => setUsersList(prev => prev.concat(json.data)))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return React.createElement(
    'table',
    { onClick: fetchUsers },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement('th', null, 'Name'),
        React.createElement('th', null, 'Email'),
      ),
    ),
    React.createElement(
      'tbody',
      null,
      usersList.map(user =>
        React.createElement(
          'tr',
          { key: user.id },
          React.createElement('td', null, user.first_name + ' ' + user.last_name),
          React.createElement('td', null, user.email),
        ),
      ),
    ),
  );
}
