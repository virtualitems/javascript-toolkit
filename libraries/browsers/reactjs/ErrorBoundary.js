/**
 * @typedef _TProps
 * @type {object}
 * @property {React.ReactElement} fallback
 * @property {(error: Error, errorInfo: React.ErrorInfo) => void} componentDidCatch
 *
 * @typedef TProps
 * @type {import('react').HTMLAttributes<HTMLDivElement> & _TProps}
 */

/**
 * @typedef TState
 * @type {object}
 * @property {Error | null} error
 */

/**
 * @description 
 */
export default class ErrorBoundary extends React.Component
{

  /** @type {TProps} */
  props;

  /** @type {TState} */
  state;

  /**
   * @param {TProps} props
   */
  constructor(props)
  {
    super(props);
    this.state = { error: null };
  }

  /**
   * @param {Error} error
   * @returns {TState}
   */
  static getDerivedStateFromError(error)
  {
    return { error };
  }

  /**
   * @param {Error} error
   * @param {import('react').ErrorInfo} errorInfo
   */
  componentDidCatch(error, errorInfo)
  {
    this.props.componentDidCatch(error, errorInfo);
  }

  resetErrorBoundary()
  {
    this.setState({ error: null });
  }

  /**
   * @returns {import('react').ReactElement}
   */
  render()
  {
    if (this.state.error === null) {
      return this.props.children;
    }

    return React.createElement(this.props.fallback, { error: this.state.error });

  }

}
