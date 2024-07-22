const css = new CSSStyleSheet();

css.replaceSync(`
.lazy-component {
  font-size: 3em;
  text-align: center;
  text-transform: uppercase;
  text-shadow: #F55 1px 0 10px;
  cursor: pointer;
  transition: font-size 0.5s;
}

.lazy-component::before {
  content: '🚀 ';
}

.lazy-component:hover {
  font-size: 4em;
}
`);

document.adoptedStyleSheets.push(css);


export default function LazyComponent(props)
{
  return React.createElement('div', { className: 'lazy-component' }, props.children);
}
