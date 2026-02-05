import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  bg: '#F3E2D4',
  soft: '#C5B0CD',
  primary: '#000000',
  accent: '#415E72',
  dark: '#000000',
  blob2: '#000000',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    overflow: 'hidden',
  },

  blobBig: {
    position: 'absolute',
    width: width * 1.3,
    height: width * 1.3,
    borderRadius: width,
    backgroundColor: COLORS.soft,
    top: -width * 0.6,
    right: -width * 0.6,
  },

  blobAccent: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.accent,
    bottom: width * 0.3,
    left: -60,
  },
  blobAccent2: {
    position: 'absolute',
    width: 180,
    height: 180,
    // borderRadius: 90,
    backgroundColor: COLORS.blob2,
    bottom: 50,
    left: width * 0.9,
    transform: [{ rotate: '4deg' }],
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  title: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 50,
  },

  featureBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 22,
    marginBottom: 40,
  },

  featureText: {
    fontSize: 14,
    color: COLORS.dark,
    marginBottom: 10,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 56,
    borderRadius: 40,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
    textAlign: 'center',
  },

  secretBox: {
    position: 'absolute',
    top: height * 0.3,
    alignSelf: 'center',
    backgroundColor: '#000000dd',
    padding: 26,
    borderRadius: 22,
    width: '80%',
  },

  secretTitle: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },

  secretText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  touchWrapper: {
    zIndex: 1,
  },
});
