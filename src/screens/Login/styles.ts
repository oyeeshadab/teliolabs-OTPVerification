import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { AppTheme } from '../../theme/themes';

export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 12,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 24,
    },
    input: {
      height: 52,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    button: {
      height: 52,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.colors.border,
      fontSize: 16,
      fontWeight: '600',
    },
  });
