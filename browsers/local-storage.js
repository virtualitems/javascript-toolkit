(function(){

if (!window.localStorage) {
  throw new Error('localStorage is not available')
}

const data = { message: 'Hello World!' };

// save
window.localStorage.setItem('data', JSON.stringify(data));

// load
const recovered = JSON.parse(window.localStorage.getItem('data'));

console.log(recovered.message);

})()
