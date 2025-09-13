fetch('https://reqres.in/api/users', {
  method: 'GET',
  headers: {
    'x-api-key': 'reqres-free-v1'
  }
})
  .then(response => {

    if (response.ok === false) {
      throw new Error(response.statusText);
    }

    return response.json();
  })
  .then(() => {
    throw new Error('Simulated error');
  })
  .then(
    json => {
      const users = json.data;
      const div = document.createElement('div');

      users.forEach(u => {
        const p = document.createElement('p');
        p.textContent = `${u.first_name} ${u.last_name} (${u.email})`;
        div.appendChild(p);
      });

      document.body.appendChild(div);
    },
    err => {
      const p = document.createElement('p');
      p.textContent = `Error: ${err.message}`;
      document.body.appendChild(p);
      return Promise.reject(err); // rethrow to propagate to the next catch
    }
  ).then(
    () => {
      const p = document.createElement('p');
      p.textContent = 'Fetch attempt finished with success';
      document.body.appendChild(p);
    },
    err => {
      const p = document.createElement('p');
      p.textContent = 'Fetch attempt finished with error';
      document.body.appendChild(p);
      return Promise.reject(err); // rethrow to propagate to the next catch
    }
  )
  .catch(err => {
    const p = document.createElement('p');
    p.textContent = `Catch: ${err.message}`;
    document.body.appendChild(p);
  })
  .finally(() => {
    const p = document.createElement('p');
    p.textContent = 'Promise finally finished';
    document.body.appendChild(p);
  });