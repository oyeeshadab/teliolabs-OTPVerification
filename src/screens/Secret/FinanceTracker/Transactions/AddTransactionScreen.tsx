import React from 'react';
import Text from '@components/Text/Text';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransaction } from './useTransaction';
import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';
import { CategoryIcon } from '@components/FinanceTracker/Components/CategoryIconComponent';
import { Toast } from '@components/Toast/Toast';
import BottomSheetComponent from '@components/BottomSheet/BottomSheetComponent';
import { AmountCalculator } from '@components/Calculator/Calulator';
import { TransactionTypeToggle } from '@components/TransactionTypeToggle/TransactionTypeToggle';
import { CategoryGrid } from '@components/FinanceTracker/Components/CategoryGrid/CategoryGrid';
import { darkenHex, lightenHex } from '@utils/color';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/AppNavigator';

type AddTransactionRouteProp = RouteProp<RootStackParamList, 'AddTransaction'>;

type Props = {
  route: AddTransactionRouteProp;
};
const AddTransaction: React.FC<Props> = ({ route }) => {
  // const route = useRoute();
  const { item } = route?.params || {};

  const {
    type,
    title,
    amount,
    setType,
    titleRef,
    setTitle,
    ripplePos,
    showToast,
    setAmount,
    scaleAnim,
    opacityAnim,
    toastMessage,
    nextColorRef,
    buttonConfig,
    onColorPress,
    selectedColor,
    bottomSheetRef,
    getCurrentTime,
    openBootomSheet,
    currentGradient,
    selectedCategory,
    createTransaction,
  } = useTransaction(item);
  const styles = useStyle();
  const { hours, minutes, ampm } = getCurrentTime();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={currentGradient}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            styles.revealCircle,
            {
              left: ripplePos.current.x,
              top: ripplePos.current.y,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[
              lightenHex(nextColorRef.current),
              darkenHex(nextColorRef.current),
              '#000000',
            ]}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View style={styles.content}>
          <View style={styles.content}>
            <ScrollView
              removeClippedSubviews
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {selectedColor && (
                <TransactionTypeToggle
                  selectedColor={selectedColor}
                  type={type}
                  setType={setType}
                />
              )}

              <View style={styles.amountCard}>
                <CategoryIcon icon_name={selectedCategory?.icon} />
                <TouchableOpacity activeOpacity={0.5} onPress={openBootomSheet}>
                  <Text weight="deliusR" variant="h1" style={styles.amount}>
                    ₹{amount}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.todayRow}>
                <Text style={styles.today}>Today</Text>
                <View style={styles.timeBox}>
                  <Text style={styles.time}>{hours}</Text>
                  <Text style={styles.timeColon}>:</Text>
                  <Text style={styles.time}>{minutes}</Text>
                  <Text style={styles.pm}>{ampm}</Text>
                </View>
              </View>

              <TextInput
                ref={titleRef}
                value={title}
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="rgba(255,255,255,0.5)"
                onChangeText={e => setTitle(e)}
              />

              <TouchableOpacity style={styles.attachment}>
                <Text style={styles.attachmentText}>Add attachment</Text>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>

              <CategoryGrid onSelect={onColorPress} />
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={createTransaction}
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: lightenHex(selectedColor),
                },
              ]}
            >
              <Text color="black" size={16}>
                {buttonConfig.label}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Toast message={toastMessage} visible={showToast} />
        {/* </TouchableOpacity> */}

        <BottomSheetComponent ref={bottomSheetRef}>
          <AmountCalculator
            backgroundColor={selectedColor}
            darkBackgroundColor={darkenHex(selectedColor)}
            bottomSheetRef={bottomSheetRef}
            amount={amount}
            setAmount={setAmount}
          />
        </BottomSheetComponent>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </View>
  );
};

export default AddTransaction;
