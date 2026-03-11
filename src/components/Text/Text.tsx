import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  Pressable,
} from 'react-native';
import { fonts, variants } from '@theme/typography';

type VariantType = keyof typeof variants;
type WeightType = keyof typeof fonts;

interface Props extends TextProps {
  variant?: VariantType;
  size?: number;
  weight?: WeightType;
  color?: string;
  center?: boolean;
  right?: boolean;
  active?: boolean;
  inactiveColor?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  letterSpacing?: number;
  lineHeight?: number;
  onPress?: () => void;
  loading?: boolean;
  style?: TextStyle;
  children: React.ReactNode;
}

const AppText: React.FC<Props> = ({
  variant = 'body',
  size,
  weight = 'pinstripeR',
  color = '#000',
  center,
  right,
  active = true,
  inactiveColor = '#999',
  uppercase,
  lowercase,
  letterSpacing,
  lineHeight,
  onPress,
  loading,
  style,
  children,
  ...rest
}) => {
  const variantStyle = variants[variant];

  const fontSize = size ?? variantStyle.size;
  const fontWeight = weight ?? (variantStyle.weight as WeightType);

  const textColor = active ? color : inactiveColor;

  let textTransform: TextStyle['textTransform'];
  if (uppercase) textTransform = 'uppercase';
  if (lowercase) textTransform = 'lowercase';

  const content = (
    <Text
      {...rest}
      style={[
        styles.base,
        {
          fontFamily: fonts[fontWeight],
          fontSize,
          color: textColor,
          textAlign: center ? 'center' : right ? 'right' : 'left',
          letterSpacing,
          lineHeight: lineHeight ?? fontSize * 1.4,
          textTransform,
          opacity: loading ? 0.4 : 1,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );

  if (onPress) return <Pressable onPress={onPress}>{content}</Pressable>;

  return content;
};

export default AppText;

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
