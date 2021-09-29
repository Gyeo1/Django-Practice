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
const App = () => {
  const currentTime = useCurrentTime();
  return <div>{currentTime}</div>;
};

export default App;
