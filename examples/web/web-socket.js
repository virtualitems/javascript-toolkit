(function() {

  const socket = new WebSocket('wss://example.com');

  socket.addEventListener('open', function(event) {
    console.log('Connection established');

    socket.send('hello world!');
    socket.close();
  });

  socket.addEventListener('message', function(event) {
    console.log('Message received', event.data);
  });

  socket.addEventListener('close', function(event) {
    console.log('Connection closed');
  });

  socket.addEventListener('error', function(error) {
    console.error('Error', error);
  });

})();
