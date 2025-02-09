(function(){

if (!window.indexedDB) {
  throw new Error('indexedDB is not available')
}

const dbName = 'my-database';
const dbVersion = 1;
const openRequest = window.indexedDB.open(dbName, dbVersion);

// open error
openRequest.onerror = (event) => {
  console.error('error', event);
};

// open blocked
openRequest.onblocked = (event) => {
  console.error('blocked', event);
};

// open upgrade needed
openRequest.onupgradeneeded = (event) => {
  const database = event.target.result;
  const objectStore = database.createObjectStore('my-store', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: false });
};

// open success
openRequest.onsuccess = (event) => {
  const database = event.target.result;
  const transaction = database.transaction(['my-store'], 'readwrite');
  const objectStore = transaction.objectStore('my-store');

  // create
  const addRequest = objectStore.add({ id: 1, name: 'John Doe' });
  addRequest.onsuccess = (event) => console.log('add -> success', addRequest.result);
  addRequest.onerror = (event) => console.error('add -> error', event);

  // read
  const getRequest = objectStore.get(1);
  getRequest.onsuccess = (event) => console.log('get -> success', getRequest.result);
  getRequest.onerror = (event) => console.error('get -> error', event);

  // update
  const putRequest = objectStore.put({ id: 1, name: 'Jane Doe' });
  putRequest.onsuccess = (event) => console.log('put -> success', putRequest.result);
  putRequest.onerror = (event) => console.error('put -> error', event);

  // delete
  const deleteRequest = objectStore.delete(1);
  deleteRequest.onsuccess = (event) => console.log('delete -> success', deleteRequest.result);
  deleteRequest.onerror = (event) => console.error('delete -> error', event);

  // close
  transaction.oncomplete = (event) => {
    console.log('transaction complete -> closing database');
    database.close();
  };

};

})();
