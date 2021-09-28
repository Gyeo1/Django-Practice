import React from 'react';

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error }; //반환된 객체가 상태값에 반영
  }
  componentDidCatch(error, errorInfo) {
    console.group('componenetDidCatch');
    console.log(error);
    console.log(errorInfo);
    console.groupEnd();
  }

  render() {
    const { error } = this.state;
    if (error !== null) {
      return (
        <div>
          <h2>Something went Wrong!</h2>
          <div>{error.toString()}</div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
