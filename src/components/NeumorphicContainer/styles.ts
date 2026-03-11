import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    wrapper: {
      borderRadius: 24,
      overflow: 'hidden',
      borderWidth: 1.2,
      borderColor: 'rgba(255,255,255,0.4)',
      backgroundColor: 'rgba(255,255,255,0.08)',
      marginVertical: 10,
    },
    blur: {
      padding: 20,
    },
    androidFallback: {
      padding: 20,
      backgroundColor: 'rgba(255,255,255,0.12)',
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    content: {
      zIndex: 2,
    },
  });
