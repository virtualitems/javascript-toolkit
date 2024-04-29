import React from 'react';


type TProps = React.HTMLAttributes<HTMLDivElement> & {
  fallback?: (error: Error) => React.ReactNode;
  componentDidCatch?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

type TState = {
  error: Error | null;
};


/**
 * @description Provides an error boundary for the children components
 */
export default class ErrorBoundary extends React.Component
{

  declare props: TProps;

  declare state: TState;

  constructor(props: TProps)
  {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error)
  {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo)
  {
    if ('function' === typeof this.props.componentDidCatch) {
      this.props.componentDidCatch(error, errorInfo);
    }
  }

  resetErrorBoundary()
  {
    this.setState({ error: null });
  }

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
