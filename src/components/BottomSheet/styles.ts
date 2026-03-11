import { AppTheme } from '@theme/themes';
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    bottomSheetWrapper: {
      backgroundColor: theme.colors.white,
      display: 'none',
    },
    bottomSheetContainer: { height: '100%' },
  });
