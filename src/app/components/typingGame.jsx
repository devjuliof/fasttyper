/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
'use client';

import React, { useRef } from 'react';
import styles from './typingGame.module.css';
import getCuriosity from '../apiServices/getCuriosity';
import countWords from '../utils/countWords';

export default function TypingGame({ onStart, onEnd }) {
  const [userType, setUserType] = React.useState('');
  const [timerStarted, setTimerStarted] = React.useState(false);
  const [curiosity, setCuriosity] = React.useState('Carregando...');
  const inputRef = useRef(null);

  React.useEffect(() => {
    const fetchCuriosity = async () => {
      const result = await getCuriosity();
      if (result) {
        setCuriosity(result);
      } else {
        console.log('Não foi possível obter uma curiosidade.');
      }
    };

    fetchCuriosity();
  }, []);

  function handleInputUser(event) {
    const inputValue = event.target.value;
    setUserType(inputValue);

    if (!timerStarted && inputValue.length === 1) {
      onStart();
      setTimerStarted(true);
    }

    if (inputValue === curiosity) {
      const qntWords = countWords(curiosity);
      onEnd(qntWords);
    }
  }

  function getColorForLetter(index) {
    if (userType[index] === curiosity[index]) {
      return 'green';
    } else if (userType[index] !== undefined) {
      return 'red';
    }
  }

  function getBackgroundForNextLetter(index) {
    if (index === userType.length) {
      return 'rgba(255, 255, 224, 0.7)';
    }
    return 'transparent';
  }

  const handleContentClick = () => {
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key.length === 1) {
      const newValue = userType + event.key;
      setUserType(newValue);

      if (!timerStarted && newValue.length === 1) {
        onStart();
        setTimerStarted(true);
      }

      if (newValue === curiosity) {
        const qntWords = countWords(curiosity);
        onEnd(qntWords);
      }
    }
  };

  return (
    <>
      <main className={styles.box}>
        <header className={styles.header}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </header>
        <article
          className={styles.content}
          onClick={handleContentClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <input
            type="text"
            onChange={handleInputUser}
            ref={inputRef}
            style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
          />
          <div className={styles.curiosity}>
            {curiosity.split('').map((letter, index) => (
              <span
                key={index}
                style={{
                  color: getColorForLetter(index),
                  backgroundColor: getBackgroundForNextLetter(index),
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
