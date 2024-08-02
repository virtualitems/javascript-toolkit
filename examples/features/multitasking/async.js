async function getMessage() {
  return 'Hello world';
}

async function greet() {
  const message = await getMessage();
  console.log(message);
};
