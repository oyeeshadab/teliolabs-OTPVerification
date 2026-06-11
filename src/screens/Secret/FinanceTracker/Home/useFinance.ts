import { useTheme } from '@theme/ThemeProvider';
import { useCallback, useEffect, useState } from 'react';
import {
  CurrentMonthTxResponse,
  TransactionSection,
  User,
} from '@database/types';
import { TransactionRepo } from '@database/repository';
import { useFocusEffect } from '@react-navigation/native';
import { Simplifier } from '@database/repository/simplifier.repo';
import { useSelector } from 'react-redux';

export const useFinance = () => {
  const { theme } = useTheme();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionSection[]>([]);
  const [total_expense, setTotal_expense] = useState<number>(0);
  const [total_income, setTotal_income] = useState<number>(0);
  const user = useSelector((state: { user: { currentUser: User } }) => {
    return state.user.currentUser;
  });
  console.log('🚀 ~ useFinance ~ user:', user);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        try {
          const res: CurrentMonthTxResponse =
            await TransactionRepo.getCurrentMonthTransactions(user?.id || -1);
          if (isActive) {
            setTotal_income(res?.summary?.total_income);
            setTotal_expense(res?.summary?.total_expense);
            if (isActive)
              setWalletBalance(
                res?.summary?.total_income - res?.summary?.total_expense,
              );
            const sections = Object.keys(res?.transactions || {}).map(date => ({
              title: date,
              data: res?.transactions[date],
            }));
            setTransactions(sections);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    async function fetch() {
      const getTransactionCount = await Simplifier.getTransactionCount();
      console.log(
        '🚀 ~ fetch ~ getTransactionCount:getTransactionCount',
        getTransactionCount,
      );
    }
    fetch();
  }, []);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return {
    Buttons,
    transactions,
    showMoney,
    toggleMoney,
    walletBalance,
    total_expense,
    total_income,
    formatDate,
  };
};
