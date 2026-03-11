import { BottomSheetRef } from '@components/BottomSheet/BottomSheetComponent';
import { CategoriesRepo, TransactionRepo } from '@database/repository';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  TextInput,
} from 'react-native';

export const useTransactionTypeToggle = ({ type }) => {
  console.log('🚀 ~ useTransactionTypeToggle ~ type:', type, 'Shadab');
  const [width, setWidth] = useState(0);
  // const [type, setType] = useState<'expense' | 'income'>('expense');
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (width === 0) return;

    Animated.spring(translateX, {
      toValue: type === 'expense' ? 0 : width / 2,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [type, width]);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return {
    width,
    onLayout,
    type,
    translateX,
  };
};
