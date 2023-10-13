(function(){

const template = document.querySelector('template');

const fragment = template.content;

const clone = fragment.cloneNode(true);

const element = clone.firstElementChild;

element.textContent += ' (cloned)';

document.body.appendChild(clone);

})();
