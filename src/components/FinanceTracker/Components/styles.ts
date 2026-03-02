import { AppTheme } from '@theme/themes';
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      height: 170,
      justifyContent: 'space-between',
      padding: 20,
    },
    balanceLabel: { color: theme.colors.white, opacity: 0.8 },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    expeseIncomRow: { flexDirection: 'row', justifyContent: 'space-between' },

    txRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    titleContainer: {
      flex: 1,
    },
    txIcon: {
      width: 40,
      height: 40,
      // backgroundColor: theme.colors.secondaryBlack,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    txAmount: { color: theme.colors.white },
  });
