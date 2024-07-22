import React from 'react';

/**
 * @typedef _TProps
 * @type {object}
 * @property {(error: Error) => React.ReactNode} fallback
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
    if ('function' === typeof this.props.componentDidCatch) {
      this.props.componentDidCatch(error, errorInfo);
    }
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

    if ('function' !== typeof this.props.fallback) {
      this.resetErrorBoundary();
      return this.props.children;
    }

    const children = this.props.fallback(this.state.error);

    if (React.isValidElement(children)) {
      return children;
    }

    throw new Error('ErrorBoundary: fallback must return a valid React element');
  }

}
