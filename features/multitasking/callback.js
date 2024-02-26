function getMessage(callback) {
  const message = 'Hello world';
  callback(message);
};

function greet() {
  getMessage(function(message) {
    console.log(message);
  });
};
