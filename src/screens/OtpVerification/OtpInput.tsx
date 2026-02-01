import React, { useRef } from 'react';
import { View, TextInput } from 'react-native';
import { useStyle } from './styles';
import { useTheme } from '../../theme/ThemeProvider';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  length?: number;
}

export const OtpInput = ({ value, onChange, length = 4 }: Props) => {
  const inputs = useRef<TextInput[]>([]);

  const { theme } = useTheme();
  const styles = useStyle(theme);

  const updateOtp = (digit: string, index: number) => {
    const updated = [...value];
    console.log('🚀 ~ updateOtp ~ updated:', updated);
    updated[index] = digit;
    onChange(updated);
  };

  const handleChangeText = (text: string, index: number) => {
    console.log('🚀 ~ handleChangeText ~ text:', text);
    const digit = text.replace(/[^0-9]/g, '');
    if (!digit && text !== '') return;

    updateOtp(digit, index);

    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (!digit && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    const { key } = e.nativeEvent;
    if (key.isNaN) return;
    if (/^[0-9]$/.test(key)) {
      console.log(
        '🚀 ~ handleKeyPress ~ /^[0-9]$/.test(key):',
        /^[0-9]$/.test(key),
      );
      updateOtp(key, index);

      if (index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    const input = inputs.current[index];
    console.log('🚀 ~ handleFocus ~ input:', input);
    if (!input || !value[index]) return;

    input.setNativeProps({
      selection: { start: 0, end: 1 },
    });
  };

  return (
    <View style={styles.otpInputContainer}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => {
            if (ref) inputs.current[index] = ref;
          }}
          value={value[index]}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          onFocus={() => handleFocus(index)}
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          style={[styles.input, { color: theme.colors.text }]}
        />
      ))}
    </View>
  );
};
