(function(){

document.addEventListener('greet-event', (event) => {
  console.log(event.detail.message);
});

document.dispatchEvent(new CustomEvent('greet-event',
  {
    detail: {
      message: 'Hello world'
    }
  }
));

})();

