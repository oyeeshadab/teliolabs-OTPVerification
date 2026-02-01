import { useMemo } from 'react';

export const useEmailValidation = (email: string) => {
  const isValidEmail = useMemo(() => {
    if (!email) return false;
    return /\S+@\S+\.\S+/.test(email);
  }, [email]);

  return {
    isValidEmail,
  };
};
