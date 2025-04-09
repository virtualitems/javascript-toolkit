(async () => {
  /** @class */
  class UserModel {
    constructor() {
      this.id = null;
      this.email = null;
      this.firstName = null;
      this.lastName = null;
      this.avatar = null;
    }

    get fullName() {
      return [this.firstName, this.lastName].filter(Boolean).join(' ');
    }
  }

  // prepare phase
  const requestTarget = new URL('https://reqres.in/api/users');

  const headers = new Headers({
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
    'Content-Language': 'en-US',
    Accept: 'application/json',
    'Accept-Language': 'en-US',
  });

  const requestOptions = { method: 'GET', cors: 'cors', headers };

  // request phase
  const response = await fetch(requestTarget, requestOptions);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // decode phase
  const json = await response.json();

  const page = json.page;
  const perPage = json.per_page;
  const total = json.total;
  const totalPages = json.total_pages;
  const data = json.data;

  // transform phase
  const users = data.map(user => {
    const userModel = new UserModel();
    userModel.id = user.id;
    userModel.email = user.email;
    userModel.firstName = user.first_name;
    userModel.lastName = user.last_name;
    userModel.avatar = user.avatar;
    return userModel;
  });

  // use phase

  // use as raw data
  const pElement = document.body.appendChild(document.createElement('p'));
  pElement.innerHTML = `Page: ${page}<br>Per Page: ${perPage}<br>Total: ${total}<br>Total Pages: ${totalPages}`;

  // use as models
  for (const user of users) {
    const div = document.body.appendChild(document.createElement('div'));

    const img = div.appendChild(document.createElement('img'));
    img.src = user.avatar;

    const p1 = div.appendChild(document.createElement('p'));
    p1.textContent = user.fullName;

    const p2 = div.appendChild(document.createElement('p'));
    p2.textContent = user.email;
  }
})();
