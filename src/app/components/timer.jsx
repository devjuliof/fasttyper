'use client';

import React from 'react';

export default function Timer({ startTime }) {
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    if (!startTime) return;

    const timer = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  return <h3>{currentTime}s</h3>;
}
