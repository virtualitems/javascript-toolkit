const html = `<h1>DOM Parser Example</h1>`;

const sheet = new CSSStyleSheet();

sheet.replace(`
h1 {
  font-family: sans-serif;
  text-align: center;
}
`);

document.adoptedStyleSheets.push(sheet);

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
