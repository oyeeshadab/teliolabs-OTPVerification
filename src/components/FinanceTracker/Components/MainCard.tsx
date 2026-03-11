import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import { BlurView } from '@sbaiahmed1/react-native-blur';
import Text from '@components/Text/Text';
import Feather from 'react-native-vector-icons/Feather';
import { useStyle } from './styles';
import { useTheme } from '@theme/ThemeProvider';
import { useFinanceTracker } from '@hooks/useFinanceTracker';

const MainCard = ({
  showMoney,
  walletBalance,
  total_expense,
  total_income,
  onPress,
}: {
  showMoney: boolean;
  walletBalance: number;
  total_expense: number;
  total_income: number;
  onPress: () => void;
  navigation: () => void;
}) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const { formatCurrency } = useFinanceTracker();

  const formattedBalance = useMemo(
    () => formatCurrency(walletBalance),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletBalance],
  );

  return (
    <>
      <NeumorphicContainer>
        <View style={styles.card}>
          <BlurView
            blurType="regular"
            blurAmount={Platform.OS === 'ios' ? 25 : 5}
            style={[StyleSheet.absoluteFill]}
          />
          <View>
            <Text style={styles.balanceLabel}>Total balance</Text>
            <View style={styles.balanceRow}>
              <Text
                variant="h1"
                color={formattedBalance.isNegative ? 'red' : '#fff'}
                weight="deliusR"
              >
                {showMoney ? formattedBalance.text : '******'}{' '}
              </Text>
              <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
                <Feather name="eye" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.expeseIncomRow}>
            <View>
              <Text variant="caption" color="#fff" weight="deliusR">
                Expenses
              </Text>
              <Text variant="h3" color="#fff" weight="deliusR">
                {showMoney ? formatCurrency(total_expense).text : '******'}{' '}
              </Text>
            </View>
            <View>
              <Text variant="caption" color="#fff" weight="deliusR">
                Income
              </Text>
              <Text variant="h3" color="#fff" weight="deliusR">
                {showMoney ? formatCurrency(total_income).text : '******'}{' '}
              </Text>
            </View>
          </View>
        </View>
      </NeumorphicContainer>
    </>
  );
};

export default MainCard;
