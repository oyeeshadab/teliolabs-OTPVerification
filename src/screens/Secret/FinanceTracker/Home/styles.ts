import { AppTheme } from '@theme/themes';
import { Dimensions, StyleSheet } from 'react-native';
export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },

    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      marginRight: 10,
    },

    welcome: { color: '#aaa', fontSize: 13 },
    name: { color: '#fff', fontSize: 18, fontWeight: '600' },

    bell: {
      backgroundColor: '#1c1c1c',
      padding: 10,
      borderRadius: 20,
    },

    card: {
      height: 170,
      justifyContent: 'space-between',
      padding: 20,
    },
    addBudgetContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    cardDropdown: {
      backgroundColor: '#fff',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
      flexDirection: 'row',
      // width: 150,
      // alignSelf: 'flex-start',
      // alignItems: 'center',
      gap: 5,
    },

    balanceLabel: { color: '#fff', opacity: 0.8 },

    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    balance: { fontSize: 32, color: '#fff', fontWeight: '600' },

    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },

    actionBtnDark: {
      backgroundColor: '#1c1c1c',
      width: 100,
      height: 70,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      elevation: 15,
      borderWidth: 1,
      borderColor: 'white',
    },

    actionBtnLight: {
      backgroundColor: '#fff',
      width: 100,
      height: 70,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
    },

    actionText: { color: '#fff', fontSize: 16 },

    txHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },

    txHeading: { color: '#fff', fontSize: 20, fontWeight: '600' },
    viewAll: { color: '#aaa' },

    txRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },

    txIcon: {
      width: 40,
      height: 40,
      backgroundColor: '#1c1c1c',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },

    txTitle: { color: '#fff', fontSize: 16 },
    txSub: { color: '#888', fontSize: 12 },
    txAmount: { color: '#fff' },

    bottomTab: {
      position: 'absolute',
      bottom: 20,
      left: 40,
      right: 40,
      backgroundColor: '#fff',
      borderRadius: 30,
      padding: 14,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    buttonContainer: {
      height: 45,
      width: Dimensions.get('window').width - 40,
      borderRadius: 10,
      justifyContent: 'center',
      elevation: 15,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 10,
    },
    actionButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSheetWrapper: {
      backgroundColor: theme.colors.white,
      display: 'none',
    },
    sectionHeader: {
      fontSize: 16,
      marginVertical: 8,
      color: theme.colors.black,
    },
    contentContainer: { paddingBottom: 160 },
    transactionListContainer: {
      maxHeight: Dimensions.get('window').height / 1.9,
    },
    sectionHeaderContainer: {
      height: 40,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderRadius: 10,
    },
  });
