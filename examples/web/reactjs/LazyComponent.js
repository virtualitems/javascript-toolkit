/**
 * @param {import('react').HTMLAttributes<HTMLElement>} props
 * @returns {import('react').ReactElement}
 */
export default function LazyComponent(props)
{
  const ref = React.useRef(null);

  const [state, setState] = React.useState(false);

  if (state === true) {
    throw new Error('Error thrown in LazyComponent');
  }

  React.useEffect(
    () => {
      const el = ref.current;
      el.style.cursor = 'pointer';
      el.style.textAlign = 'center';
      el.style.textTransform = 'uppercase';
      el.style.textShadow = '#F55 1px 0 10px';
      el.style.fontSize = '3em';
    },
    [ref.current]
  );

  const onClick = () => setState(true);

  return React.createElement('div', { ref, onClick }, props.children);
}
