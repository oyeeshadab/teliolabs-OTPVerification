import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import { useStyle } from './styles';
import { useTheme } from '@theme/ThemeProvider';
import { Transaction } from '@database/types';
import Text from '@components/Text/Text';
import { useFinanceTracker } from '@hooks/useFinanceTracker';
import { CategoryIcon } from './CategoryIconComponent';
import { useNavigation } from '@react-navigation/native';
interface Props {
  item: Transaction;
  index: number;
}

const TransactionList = ({ item }: Props) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const navigation = useNavigation();

  const { formatCurrency } = useFinanceTracker();

  const formattedBalance = formatCurrency(item?.amount);
  const handleOpen = useCallback(() => {
    console.log('-----');

    navigation.navigate('AppNavigator', {
      screen: 'AddTransaction',
      params: { item },
    });
  }, [item]);
  return (
    <Pressable
      style={({ pressed }) => [styles.txRow, { opacity: pressed ? 0.5 : 1 }]}
      onPress={handleOpen}
    >
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

      <Text
        color={item?.type === 'expense' ? theme.colors.red : theme.colors.green}
      >
        {formattedBalance.text}
      </Text>
    </Pressable>
  );
};

export default TransactionList;
