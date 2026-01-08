const html = `<html><head></head><body><h1>DOM Parser Example</h1></body></html>`;

function handleClick() {
  const parser = new DOMParser();

  const incoming = parser.parseFromString(html, 'text/html');

  document.documentElement.replaceChild(incoming.body, document.body);
}

document.addEventListener('click', handleClick, { once: true });
