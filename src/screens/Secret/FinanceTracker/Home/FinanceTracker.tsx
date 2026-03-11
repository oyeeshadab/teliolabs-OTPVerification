import Header from '@components/FinanceTracker/Header/Header';
import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  SectionList,
  SectionListRenderItemInfo,
} from 'react-native';
import Wrapper from '@components/Wrapper/FinanceTrackerWrapper';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import { useTheme } from '@theme/ThemeProvider';
import { useFinance } from './useFinance';
import { RenderIcon } from '@utils/iconHelpers';
import { useStyle } from './styles';
import Text from '@components/Text/Text';
import MainCard from '@components/FinanceTracker/Components/MainCard';
import { Transaction } from '@database/types';
import TransactionList from '@components/FinanceTracker/Components/TransactionList';

export default function FinanceTracker({ navigation }: { navigation: any }) {
  const {
    walletBalance,
    transactions,
    showMoney,
    toggleMoney,
    total_expense,
    total_income,
    formatDate,
  } = useFinance();
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const handleOpen = useCallback(() => {
    navigation.navigate('AppNavigator', {
      screen: 'AddTransaction',
    });
  }, [navigation]);

  const renderItems = useCallback(
    ({ item, index }: SectionListRenderItemInfo<Transaction>) => {
      return <TransactionList item={item} index={index} />;
    },
    [],
  );

  return (
    <>
      <Wrapper padding useSafeArea bubble>
        <Header />

        {/* CARD */}

        <MainCard
          showMoney={showMoney}
          walletBalance={walletBalance}
          total_expense={total_expense}
          total_income={total_income}
          onPress={toggleMoney}
          navigation={navigation}
        />

        {/* ACTIONS */}
        <View style={styles.actions}>
          <NeumorphicContainer>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleOpen}
              style={[styles.buttonContainer]}
            >
              <View style={styles.actionButtonContainer}>
                <RenderIcon
                  library={'Ionicons'}
                  name={'add'}
                  color={theme.colors.black}
                />
                <Text color={theme.colors.black} size={16}>
                  Add
                </Text>
              </View>
            </TouchableOpacity>
          </NeumorphicContainer>
        </View>

        {/* TRANSACTIONS HEADER */}
        <View style={styles.txHeader}>
          <Text style={styles.txHeading}>Recent Transaction</Text>
          <Text style={styles.viewAll}>View all</Text>
        </View>

        <SectionList
          sections={transactions}
          keyExtractor={item => item.id?.toString() ?? Math.random().toString()}
          renderItem={renderItems}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.buttonContainer}>
              <Text weight="deliusR" style={styles.sectionHeader}>
                {formatDate(title)}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={styles.transactionListContainer}
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={10}
          removeClippedSubviews={true}
        />
      </Wrapper>
    </>
  );
}
