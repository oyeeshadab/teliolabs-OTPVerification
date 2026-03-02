import Header from '@components/FinanceTracker/Header/Header';
import React, { useCallback, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Wrapper from '@components/Wrapper/FinanceTrackerWrapper';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import { useTheme } from '@theme/ThemeProvider';
import { useFinance } from './useFinance';
import { RenderIcon } from '@utils/iconHelpers';
import { useStyle } from './styles';
import Text from '@components/Text/Text';
import TransactionList from '@components/FinanceTracker/Components/TransactionList';
import { Transaction } from '@database/types';
import MainCard from '@components/FinanceTracker/Components/MainCard';
import BottomSheetComponent, {
  BottomSheetRef,
} from '@components/BottomSheet/BottomSheetComponent';
import AddTransactionScreen from '@screens/Secret/FinanceTracker/Transactions/AddTransactionScreen';

interface Props {
  item: Transaction;
  index: number;
}
export default function FinanceTracker({ navigation }) {
  const {
    walletBalance,
    transactions,
    showMoney,
    toggleMoney,
    total_expense,
    total_income,
  } = useFinance();
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const renderItem = ({ item, index }: Props) => (
    <TransactionList item={item} index={index} />
  );

  const handleOpen = useCallback(() => {
    // bottomSheetRef.current?.open();
    // setTimeout(() => {
    navigation.navigate('AppNavigator', {
      screen: 'AddTransaction',
    });
    // }, 10);
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

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
              style={[
                styles.buttonContainer,
                { backgroundColor: theme.colors.white },
              ]}
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

        {/* LIST */}
        <FlatList
          data={transactions}
          renderItem={renderItem}
          // keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: Dimensions.get('window').height / 1.9 }}
          contentContainerStyle={{ paddingBottom: 160 }}
        />
      </Wrapper>

      {/* <BottomSheetComponent ref={bottomSheetRef}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // marginTop: 40,
          }}
        >
        </View>
        <AddTransactionScreen /> */}

      {/* <View style={{ marginTop: 50 }}>
          <Button
            title="Close"
            onPress={() => bottomSheetRef.current?.close()}
          />
        </View> */}
      {/* <Text variant="h1">Hello</Text> */}
      {/* </BottomSheetComponent> */}
    </>
  );
}
