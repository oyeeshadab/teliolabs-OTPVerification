import { useEffect, useState } from 'react';

export const useOtpTimer = (initialSeconds: number = 60) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const resetTimer = () => {
    setSecondsLeft(initialSeconds);
  };

  return {
    secondsLeft,
    canResend: secondsLeft === 0,
    resetTimer,
  };
};
