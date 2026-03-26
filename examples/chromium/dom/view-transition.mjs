const ClickHandler = {
  handleEvent() {
    document.startViewTransition(() => {
      window.requestAnimationFrame(() => {
        const heading = document.body.querySelector('h1');
        heading.className = (heading.classList.contains('left')) ? 'right' : 'left';
      });
    });
  }
};

const DOMContentLoadedHandler = {
  handleEvent() {
    const heading = document.createElement('h1');
    heading.textContent = 'View Transition Example';
    heading.className = 'left';
    heading.addEventListener('click', ClickHandler);
    document.body.appendChild(heading);
  }
};

document.addEventListener('DOMContentLoaded', DOMContentLoadedHandler, { once: true });

const sheet = new CSSStyleSheet();

sheet.replace(`
h1 {
  font-family: sans-serif;
  text-align: center;
  user-select: none;
  cursor: pointer;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}
`);

document.adoptedStyleSheets.push(sheet);
