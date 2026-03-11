export const useFinanceTracker = () => {
  const formatCurrency = (value: string | number = 0) => {
    if (value === null || value === undefined) {
      return { text: '₹ 0', color: '#000' };
    }

    const numeric = Number(String(value).replace(/,/g, ''));

    const formatted = new Intl.NumberFormat('en-IN').format(Math.abs(numeric));

    return {
      text: `₹ ${formatted}`,
      color: numeric < 0 ? 'red' : '#000',
      isNegative: numeric < 0,
    };
  };

  return { formatCurrency };
};
