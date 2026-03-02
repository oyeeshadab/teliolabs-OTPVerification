import React, { Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useCalculator } from './useCalculator';
import Text from '@components/Text/Text';

const keys = [
  '1',
  '2',
  '3',
  '÷',
  '4',
  '5',
  '6',
  '×',
  '7',
  '8',
  '9',
  '-',
  '.',
  '0',
  '⌫',
  '+',
];

export const AmountCalculator = ({
  backgroundColor,
  bottomSheetRef,
  darkBackgroundColor,
  amount,
  setAmount,
}: {
  backgroundColor: string;
  bottomSheetRef: any;
  darkBackgroundColor: string;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}) => {
  const { expression, appendValue, deleteLast } = useCalculator({
    setAmount,
  });

  const handlePress = (key: string) => {
    console.log('🚀 ~ handlePress ~ key:', key);
    if (key === '⌫') {
      deleteLast();
      return;
    }

    appendValue(key);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.topSection}
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
          />

          <View
            style={[styles.bottomSection, { backgroundColor: backgroundColor }]}
          >
            <Text weight="regular" variant="h2" color="#ffffff">
              Enter Amount
            </Text>
            <View style={styles.displayContainer}>
              <Text variant="h3" weight="deliusR" color="#ffffff">
                {expression || '0'}
              </Text>

              <Text
                variant="h1"
                style={styles.result}
                color="#ffffff"
                weight="deliusR"
              >
                ₹{Number(amount).toFixed(2)}
              </Text>
            </View>
            <View
              style={[styles.keypad, { backgroundColor: darkBackgroundColor }]}
            >
              {keys.map((key, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.key}
                  onPress={() => handlePress(key)}
                >
                  <Text variant="h2" weight="deliusR" style={styles.keyText}>
                    {key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => bottomSheetRef.current?.close()}
          style={[styles.button, { backgroundColor: darkBackgroundColor }]}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  topSection: {
    flex: 0.3,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },

  bottomSection: {
    flex: 0.7,
    padding: 20,
  },

  bottomText: {
    color: '#FFF',
    fontSize: 18,
  },

  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  displayContainer: {
    marginVertical: 10,
  },
  result: {
    textAlign: 'right',
  },
  keypad: {
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '60%',
  },
  key: {
    width: '25%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  keyText: {
    color: 'white',
  },

  container: {
    flex: 1,
  },
});
