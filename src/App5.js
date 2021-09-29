import React, { useEffect, useState } from 'react';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = React.useState('');
  React.useEffect(() => {
    const handler = setInterval(() => {
      const currentTime = new Date().toISOString().slice(11, 19);
      setCurrentTime(currentTime);
    }, 1000);
    return () => clearInterval(handler);
  }, []);
  return currentTime;
};

const useWindowWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
};
const Message = ({ message }) => {
  const windowWidth = useWindowWidth();
  return (
    <div>
      windowWidth: {windowWidth}, message: {message}
    </div>
  );
};
const App = () => {
  const currentTime = useCurrentTime();
  return (
    <div>
      {currentTime}
      <hr />
      <Message />
    </div>
  );
};

export default App;
