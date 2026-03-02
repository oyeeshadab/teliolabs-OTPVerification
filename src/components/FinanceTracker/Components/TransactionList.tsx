import { View } from 'react-native';
import React from 'react';
import { useStyle } from './styles';
import { useTheme } from '@theme/ThemeProvider';
import { Transaction } from '@database/types';
import Text from '@components/Text/Text';
import { useFinanceTracker } from '@hooks/useFinanceTracker';
import { CategoryIcon } from './CategoryIconComponent';

interface Props {
  item: Transaction;
  index: number;
}

const TransactionList = ({ item }: Props) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const { formatCurrency } = useFinanceTracker();

  return (
    <View style={styles.txRow}>
      <View style={[styles.txIcon, { backgroundColor: item?.category_color }]}>
        <CategoryIcon icon_name={item?.category_icon} size={25} />
      </View>

      <View style={styles.titleContainer}>
        <Text variant="title" color={theme.colors.white}>
          {item?.title ? item?.title : item?.category_name}
        </Text>
        <Text variant="caption" color={theme.colors.white}>
          {item?.type}
        </Text>
      </View>

      <Text style={styles.txAmount}>{formatCurrency(item?.amount).text}</Text>
    </View>
  );
};

export default TransactionList;
