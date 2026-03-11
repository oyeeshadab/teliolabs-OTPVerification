import { useMemo, useState } from 'react';

export const useCalculator = ({
  amount,
  setAmount,
}: {
  amount: number | string;
  setAmount: (amount: number) => void;
}) => {
  // const [expression, setExpression] = useState<string>(amount || '');
  const [expression, setExpression] = useState<string>(
    amount !== undefined && amount !== null ? String(amount) : '',
  );

  const appendValue = (value: string) => {
    setExpression(prev => prev + value);
  };

  const deleteLast = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const clearAll = () => {
    setExpression('');
  };

  // 🔥 Safe evaluation
  const result = useMemo(() => {
    try {
      // Replace × and ÷
      const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');

      // Basic safe math validation
      if (!/^[0-9+\-*/. ]+$/.test(sanitized)) return 0;

      const evaluated = Function(`"use strict"; return (${sanitized})`)();

      if (isNaN(evaluated)) return 0;
      setAmount(evaluated);
      return evaluated;
    } catch {
      // setAmount(0);
      return 0;
    }
  }, [expression]);

  return {
    expression,
    result,
    appendValue,
    deleteLast,
    clearAll,
  };
};
