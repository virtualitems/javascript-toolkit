import React from 'react';

/**
 * @typedef Props
 * @type {import('react').PropsWithChildren<HTMLElement> & {
 *   fallback: React.ReactElement,
 *   onError: (error: Error, info: React.ErrorInfo) => void
 * }}
 */

/**
 * @typedef State
 * @type {object}
 * @property {Error | null} error
 */

/**
 * @description Initial state of the ErrorBoundary component
 */
const initialState = {
  error: null,
};

/**
 * @description React Error Boundary Component
 */
export class ErrorBoundary extends React.Component {
  /** @type {Props} */
  props;

  /** @type {State} */
  state;

  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);

    const { fallback, onError } = props;

    if (typeof fallback !== 'function') {
      throw new TypeError('Fallback must be a function');
    }

    if (typeof onError !== 'function') {
      throw new TypeError('onError must be a function');
    }

    this.state = initialState;
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  /**
   * @param {Error} error
   * @returns {State}
   */
  static getDerivedStateFromError(error) {
    return { error };
  }

  /**
   * @param {Error} error
   * @param {import('react').ErrorInfo} info
   */
  componentDidCatch(error, info) {
    this.props.onError(error, info);
  }

  resetErrorBoundary() {
    this.setState(initialState);
  }

  /**
   * @returns {import('react').ReactElement}
   */
  render() {
    const { error } = this.state;

    if (error === null) {
      return this.props.children;
    }

    return React.createElement(this.props.fallback, {
      error: error,
      resetErrorBoundary: this.resetErrorBoundary,
    });
  }
}
