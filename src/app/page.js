'use client';

import TypingGame from './components/typingGame';
import Timer from './components/timer';
import React from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [startTime, setStartTime] = React.useState(null);

  function handleStart() {
    setStartTime(Date.now());
  }

  const router = useRouter();

  function handleEnd(qntWords) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    const wpm = (qntWords / duration) * 60;

    router.push(
      `/result?wpm=${Math.round(wpm)}&duration=${duration.toFixed(2)}`,
    );
  }

  return (
    <main className={styles.main}>
      <Timer startTime={startTime} />
      <TypingGame onStart={handleStart} onEnd={handleEnd} />
    </main>
  );
}
