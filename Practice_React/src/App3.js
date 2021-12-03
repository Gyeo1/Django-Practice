import React from 'react';
import ErrorBoundary from './ErrorBoundary';

class Message extends React.Component {
  render() {
    throw new Error('의도한에러 발생!');
    return <div>Message Componenet</div>;
  }
}

class App3 extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Message />
      </ErrorBoundary>
    );
  }
}

export default App3;
