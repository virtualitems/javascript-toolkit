// <div id="root"></div>

(function(){

const rootElement = document.getElementById('root');

const shadow = rootElement.attachShadow({mode: 'open'});

const style = document.createElement('style');
style.textContent = `
  h1 {
    color: red;
    font-family: sans-serif;
  }
`;

const heading = document.createElement('h1');
heading.textContent = 'Shadow DOM';

shadow.appendChild(style);
shadow.appendChild(heading);

})();
