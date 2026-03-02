import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { useTransactionTypeToggle } from './useTransactionTypeToggle';
import { darkenHex } from '@utils/color';

interface Props {
  selectedColor: string;
  type: 'expense' | 'income';
  setType: (value: 'expense' | 'income') => void;
}

export const TransactionTypeToggle = ({
  selectedColor,
  type,
  setType,
}: Props) => {
  console.log('🚀 ~ TransactionTypeToggle ~ type:', selectedColor, type);

  const { width, translateX, onLayout } = useTransactionTypeToggle({ type });

  return (
    <View style={styles.bannerContainer} onLayout={onLayout}>
      {/* Sliding Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: width / 2,
            // backgroundColor: 'green',
            backgroundColor: darkenHex(selectedColor),
            transform: [{ translateX }],
          },
        ]}
      />

      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.8}
        onPress={() => setType('expense')}
      >
        <Text style={[styles.text, type === 'expense' && styles.activeText]}>
          • Expense
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.8}
        onPress={() => setType('income')}
      >
        <Text style={[styles.text, type === 'income' && styles.activeText]}>
          • Income
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#2A2A2A',
    position: 'relative',
  },

  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    zIndex: 2,
  },

  text: {
    color: '#A0A0A0',
    fontSize: 16,
    fontWeight: '600',
  },

  activeText: {
    color: '#FFF',
  },

  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: 14,
  },
});
