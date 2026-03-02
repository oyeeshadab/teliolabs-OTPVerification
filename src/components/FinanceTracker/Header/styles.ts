import { AppTheme } from '@theme/themes';
import { StyleSheet } from 'react-native';

export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    welcomeText: {
      fontSize: 18,
      //   color: '#FFC46B',
      color: theme.colors.white,
    },
    nameText: {
      // color: theme.colors.secondaryBackground
      fontSize: 14,
      color: theme.colors.white,
    },
    profileContainer: {
      height: 50,
      width: 100,
      //   backgroundColor: theme.colors.secondaryBackground,
      backgroundColor: theme.colors.white,
      //   justifyContent: 'flex-end',
      //   alignSelf: 'flex-end',
      left: 40,
      borderRadius: 50,
      justifyContent: 'center',
      //   alignItems: 'center',
      //   position: 'absolute',
      elevation: 10,
    },
    profileImageContainer: {
      height: 45,
      width: 45,
      //   backgroundColor: theme.colors.primaryBackground,
      backgroundColor: theme.colors.black,
      borderRadius: 50,
      //   bottom: 7,
      elevation: 5,
      left: 2,
      //   justifyContent: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
