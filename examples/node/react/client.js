import { createElement, useState, useEffect } from 'https://esm.sh/react@19?dev';
import { hydrateRoot } from 'https://esm.sh/react-dom@19/client?dev';

/** @type {{ name: string, email: string }[]} */
const contacts = JSON.parse(document.getElementById('json-contacts').textContent);

const rootElement = document.getElementById('root');

hydrateRoot(rootElement, createElement(Table, { contacts }));

function Table(props) {
  const [contacts, setContacts] = useState(props.contacts);

  return createElement(
    'table',
    {
      onClick: () => setContacts(prev => prev.slice().reverse()),
      style: {
        borderCollapse: 'collapse',
        width: '100%',
        cursor: 'pointer',
      },
    },
    createElement(
      'thead',
      null,
      createElement(
        'tr',
        null,
        createElement('th', null, 'Nombre'),
        createElement('th', null, 'Email'),
      ),
    ),
    createElement(
      'tbody',
      null,
      contacts.map(contact =>
        createElement(
          'tr',
          { key: contact.email },
          createElement('td', null, contact.name),
          createElement('td', null, contact.email),
        ),
      ),
    ),
  );
}
