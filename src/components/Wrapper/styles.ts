import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/themes';

export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.black,
    },
    padding: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },

    financeContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    background: {
      ...StyleSheet.absoluteFill,
      backgroundColor: '#A0E870',
    },
    blueSection: {
      position: 'absolute',
      bottom: 0,
      height: '75%',
      width: '100%',
      backgroundColor: '#222831',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    headerContainer: {
      width: '100%',
      height: 200,
      backgroundColor: '#92ACFF',
      position: 'absolute',
    },
    bottomBlob: {
      position: 'absolute',
      width: 200,
      height: 200,
      borderRadius: 100,
      top: 50,
      right: 10,
      opacity: 0.6,
    },
    topBlob: {
      position: 'absolute',
      width: 400,
      height: 400,
      borderRadius: 200,
      right: 100,
      top: -150,
      opacity: 0.7,
    },
  });
