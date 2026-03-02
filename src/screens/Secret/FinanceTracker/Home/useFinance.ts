import { useTheme } from '@theme/ThemeProvider';
import { useCallback, useEffect, useState } from 'react';
import { Transaction } from '@database/types';
import { WaletRepo, TransactionRepo } from '@database/repository';
import { useFocusEffect } from '@react-navigation/native';

export const useFinance = () => {
  const { theme } = useTheme();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total_expense, setTotal_expense] = useState<number>(0);
  const [total_income, setTotal_income] = useState<number>(0);
  // useEffect(() => {
  //   WaletRepo.getWalletBalance().then(res => {
  //     setWalletBalance(res);
  //   });
  //   TransactionRepo.getCurrentMonthTransactions().then(res => {
  //     console.log('🚀 ~ useFinance ~ res:', res);
  //     setTransactions(res?.transactions);
  //     setTotal_income(res?.summary?.total_income);
  //     setTotal_expense(res?.summary?.total_expense);
  //   });
  // }, []);
  useFocusEffect(
    useCallback(() => {
      let isActive = true; // prevent updating state if screen is blurred

      const fetchData = async () => {
        try {
          const wallet = await WaletRepo.getWalletBalance();
          if (isActive) setWalletBalance(wallet);

          const res = await TransactionRepo.getCurrentMonthTransactions();
          console.log('🚀 ~ useFinance ~ res:', res);
          if (isActive) {
            setTransactions(res?.transactions);
            setTotal_income(res?.summary?.total_income);
            setTotal_expense(res?.summary?.total_expense);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const Buttons = [
    {
      title: 'Add',
      iconLibrary: 'Ionicons',
      iconName: 'add',
      color: theme.colors.black,
      background: true,
    },
  ];

  const [showMoney, setShowMoney] = useState(true);
  const toggleMoney = () => {
    setShowMoney(!showMoney);
  };

  const TABS = ['Expend', 'Income', 'Loan'];
  const CATEGORIES = [
    { id: '1', name: 'Food', icon: '🍔' },
    { id: '2', name: 'Social', icon: '☕' },
    { id: '3', name: 'Traffic', icon: '🚗' },
    { id: '4', name: 'Shopping', icon: '🛍️' },
    { id: '5', name: 'Grocery', icon: '🏪' },
    { id: '6', name: 'Education', icon: '🎓' },
    { id: '7', name: 'Bills', icon: '🧾' },
    { id: '8', name: 'Rentals', icon: '🏠' },
    { id: '9', name: 'Medical', icon: '🏥' },
    { id: '10', name: 'Investment', icon: '💼' },
    { id: '11', name: 'Gift', icon: '🎁' },
    { id: '12', name: 'Other', icon: '🙋' },
  ];

  return {
    Buttons,
    transactions,
    showMoney,
    toggleMoney,
    walletBalance,
    total_expense,
    total_income,
    TABS,
    CATEGORIES,
  };
};
