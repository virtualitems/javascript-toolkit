const html = `<h1>DOM Parser Example</h1>`;

function handleClick() {
  const parser = new DOMParser();

  const incoming = parser.parseFromString(html, 'text/html');

  document.documentElement.replaceChild(incoming.body, document.body);
}

document.addEventListener('click', handleClick, { once: true });
