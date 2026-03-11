import { Dimensions, StyleSheet } from 'react-native';

const CIRCLE_SIZE = 60;

export const useStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },

    gradient: {
      ...StyleSheet.absoluteFill,
      zIndex: 0,
    },

    content: {
      flex: 1,
      zIndex: 2,
    },

    scrollViewContent: {
      paddingBottom: 140,
    },

    amountCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 24,
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderRadius: 10,
      margin: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
      height: 100,
    },

    amount: { color: '#FFF' },

    todayRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
    },

    today: {
      color: '#D8E1E8',
      fontSize: 20,
      fontWeight: '600',
    },

    timeBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    time: {
      backgroundColor: 'rgba(255,255,255,0.15)',
      color: '#FFF',
      padding: 8,
      borderRadius: 6,
      marginHorizontal: 4,
      minWidth: 40,
      textAlign: 'center',
    },

    timeColon: {
      color: '#FFF',
      marginHorizontal: 4,
      fontSize: 18,
    },

    pm: {
      color: '#FFF',
      marginLeft: 6,
    },

    input: {
      backgroundColor: 'rgba(255,255,255,0.12)',
      marginHorizontal: 20,
      marginTop: 16,
      borderRadius: 14,
      padding: 16,
      color: '#FFF',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },

    attachment: {
      marginHorizontal: 20,
      marginTop: 16,
      borderRadius: 14,
      backgroundColor: 'rgba(255,255,255,0.12)',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },

    attachmentText: {
      color: '#D8E1E8',
    },

    plus: {
      color: '#FFF',
      fontSize: 22,
    },

    revealCircle: {
      position: 'absolute',
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      overflow: 'hidden',
      zIndex: 1,
    },

    buttonContainer: {
      height: 50,
      width: Dimensions.get('window').width - 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 15,
      alignSelf: 'center',
      bottom: 25,
    },
    moreBtn: {
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: 'rgba(255,255,255,0.15)',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
    },
    moreText: { color: '#D8E1E8' },
    pills: { flexDirection: 'row', paddingHorizontal: 20, gap: 10 },
    pill: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },
    activePill: { backgroundColor: 'rgba(255,255,255,0.2)' },
  });
