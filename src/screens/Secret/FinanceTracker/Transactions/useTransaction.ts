import { BottomSheetRef } from '@components/BottomSheet/BottomSheetComponent';
import { TransactionRepo } from '@database/repository';
import { Category } from '@database/types';
import { darkenHex, lightenHex } from '@utils/color';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  TextInput,
} from 'react-native';
const { width, height } = Dimensions.get('window');

export const useTransaction = () => {
  const titleRef = useRef<TextInput>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [nextColor, setNextColor] = useState('#000000');
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const CIRCLE_SIZE = 60;

  const currentGradient = useMemo(
    () => [lightenHex(selectedColor), darkenHex(selectedColor), '#000000'],
    [selectedColor],
  );

  const nextGradient = useMemo(
    () => [lightenHex(nextColor), darkenHex(nextColor), '#000000'],
    [nextColor],
  );

  const getMaxScale = (x: number, y: number) => {
    const distances = [
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y),
    ];

    const maxDistance = Math.max(...distances);

    return maxDistance / (CIRCLE_SIZE / 2);
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

      setNextColor(color.color);
      setSelectedCategory(color);

      setRipplePos({
        x: pageX - CIRCLE_SIZE / 2,
        y: pageY - CIRCLE_SIZE / 2,
      });

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
    [selectedColor, scaleAnim, opacityAnim],
  );

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handlePress = () => {
    titleRef.current?.focus();
  };

  const buttonConfig = useMemo(() => {
    if (!title.trim()) {
      return {
        label: 'Add Title',
        disabled: true,
      };
    }

    if (!selectedCategory?.id) {
      return {
        label: 'Select Category',
        disabled: true,
      };
    }

    if (!amount || Number(amount) <= 0) {
      return {
        label: 'Add Amount',
        disabled: true,
      };
    }

    return {
      label: 'Add Transaction',
      disabled: false,
    };
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

    await TransactionRepo.createTransaction({
      title,
      amount: Number(amount),
      type: type,
      category_id: selectedCategory?.id,
      note: '',
    });
  };

  const getCurrentTime = () => {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return {
      hours: hours.toString(),
      minutes: formattedMinutes.toString(),
      ampm,
    };
  };

  return {
    type,
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
    nextGradient,
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
