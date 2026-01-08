const html = `<h1>DOM Parser Example</h1>`;

function handleClick() {
  const parser = new DOMParser();

  const incoming = parser.parseFromString(html, 'text/html');

  if (document.startViewTransition === undefined) {
    document.documentElement.replaceChild(incoming.body, document.body);
    return;
  }

  document.startViewTransition(() => {
    document.documentElement.replaceChild(incoming.body, document.body);
  });
}

document.addEventListener('click', handleClick, { once: true });
