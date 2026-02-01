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
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 32,
      color: theme.colors.text,
    },
    button: {
      height: 52,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
    },
    buttonText: {
      color: theme.colors.background,
      fontSize: 16,
      fontWeight: '600',
    },
    resendContainer: {
      marginTop: 24,
      alignItems: 'center',
    },
    otpInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      width: 56,
      height: 56,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 20,
    },
    resendText: {
      fontSize: 14,
      color: theme.colors.muted,
      textAlign: 'center',
    },

    resendLink: {
      color: theme.colors.text,
      fontWeight: '600',
    },

    timerText: {
      fontSize: 14,
      color: '#94A3B8',
      textAlign: 'center',
    },
  });
