import React, { createContext, useState, useCallback } from 'react';
import { Toast } from './Toast';

interface ToastContextType {
  show: (message: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType>({
  show: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const show = useCallback(
    (msg: string, duration = 2000) => {
      setMessage(msg);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, duration);
    },
    [visible],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast message={message} visible={visible} />
    </ToastContext.Provider>
  );
};
