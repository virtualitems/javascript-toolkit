const getMessage = () => new Promise((resolve) => {
  resolve('Hello world');
});

const greet = () => {
  getMessage().then((message) => {
    console.log(message);
  });
};
