import { BottomSheetRef } from '@components/BottomSheet/BottomSheetComponent';
import { TransactionRepo } from '@database/repository';
import { Category, Transaction } from '@database/types';
import { darkenHex, lightenHex } from '@utils/color';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  TextInput,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = 60;

export const useTransaction = (item: Transaction | undefined) => {
  console.log('🚀 ~ useTransaction ~ item:', item?.amount);
  const titleRef = useRef<TextInput>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const [type, setType] = useState<'expense' | 'income'>(
    item?.type || 'expense',
  );
  const [selectedColor, setSelectedColor] = useState(
    item?.category_color || '#000000',
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    item
      ? {
          id: item?.category_id,
          color: item?.category_color,
          icon: item?.category_icon,
          name: item?.category_name || '',
        }
      : null,
  );

  const [title, setTitle] = useState(item?.title || '');
  const [amount, setAmount] = useState(item?.amount || 0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Animation refs
  const ripplePos = useRef({ x: 0, y: 0 });
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const nextColorRef = useRef('#000000');

  const getMaxScale = (x: number, y: number) => {
    const distances = [
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y),
    ];
    return Math.max(...distances) / (CIRCLE_SIZE / 2);
  };

  const openBootomSheet = () => {
    titleRef.current?.blur();
    bottomSheetRef.current?.open();
  };

  const onColorPress = useCallback(
    (color: Category, e: GestureResponderEvent) => {
      const { pageX, pageY } = e.nativeEvent;
      if (selectedColor === color.color) return;

      setSelectedColor(color.color);
      setSelectedCategory(color);

      nextColorRef.current = color.color;

      ripplePos.current = {
        x: pageX - CIRCLE_SIZE / 2,
        y: pageY - CIRCLE_SIZE / 2,
      };
      const dynamicScale = getMaxScale(pageX, pageY);

      scaleAnim.setValue(0);
      opacityAnim.setValue(1);

      Animated.timing(scaleAnim, {
        toValue: dynamicScale,
        duration: 450,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          scaleAnim.setValue(0);
          opacityAnim.setValue(1);
        });
      });
    },
    [scaleAnim, opacityAnim, selectedColor],
  );

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handlePress = () => {
    titleRef.current?.focus();
  };

  const buttonConfig = useMemo(() => {
    if (!title.trim()) return { label: 'Add Title', disabled: true };
    if (!selectedCategory?.id)
      return { label: 'Select Category', disabled: true };
    if (!amount || Number(amount) <= 0)
      return { label: 'Add Amount', disabled: true };
    return { label: 'Add Transaction', disabled: false };
  }, [title, selectedCategory, amount]);

  const createTransaction = async () => {
    if (!title.trim()) {
      handlePress();
      return;
    }
    if (!selectedCategory?.id) {
      setToastMessage('Select a category');
      setShowToast(true);
      return;
    }
    if (!amount || Number(amount) <= 0) {
      openBootomSheet();
      return;
    }
    if (buttonConfig.disabled) return;

    const transactionPayload = {
      title,
      amount: Number(amount),
      type,
      category_id: selectedCategory.id,
      category_icon: selectedCategory.icon,
      category_color: selectedCategory.color,
      note: '',
      datetime: item?.datetime,
      id: item?.id, // undefined for create
    };

    const result = item
      ? await TransactionRepo.updateTransaction(transactionPayload)
      : await TransactionRepo.createTransaction(transactionPayload);
    return result;
  };

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return {
      hours: hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      ampm,
    };
  };

  const currentGradient = useMemo(
    () => [lightenHex(selectedColor), darkenHex(selectedColor), '#000000'],
    [selectedColor],
  );

  return {
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
  };
};
