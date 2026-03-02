import React, { useEffect } from 'react';
import {
  Text,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Easing,
  View,
  StatusBar,
} from 'react-native';
import { useStyle } from './styles';
import { useWelcomeAnimation } from './useWelcomeAnimation';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from '../../theme/ThemeProvider';
import Wrapper from '../../components/Wrapper/Wrapper';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const WelcomeScreen = ({ navigation }: any) => {
  const {
    fade,
    scale,
    translateY,
    titlePressed,
    activeBlobBig,
    floatingStyle,
    setActiveBlobBig,
    setTitlePressed,
    setBlobTaps,
    secretUnlocked,
  } = useWelcomeAnimation();

  const { theme } = useTheme();
  const styles = useStyle(theme);

  const swipeY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(swipeY, {
        toValue: 1,
        duration: 9000, // Animation duration in milliseconds
        easing: Easing.bounce, // Consistent speed
        useNativeDriver: true, // Use native driver for performance
      }),
    ).start();
  }, [swipeY]);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy < -10,

      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          swipeY.setValue(gesture.dy);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -120) {
          Animated.timing(swipeY, {
            toValue: -SCREEN_HEIGHT,
            duration: 420,
            useNativeDriver: true,
          }).start(() => {
            navigation.replace('SecretNavigator', {
              screen: 'Home',
            });
          });
        } else {
          Animated.spring(swipeY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const spin = swipeY.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Wrapper>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: swipeY }],
          },
        ]}
        {...(secretUnlocked ? panResponder.panHandlers : {})}
      >
        {/* Floating Magical Blobs */}

        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => {
            if (!titlePressed) return;
            setActiveBlobBig(true);
            ReactNativeHapticFeedback.trigger('notificationSuccess');
          }}
          delayLongPress={3000}
          style={[styles.touchWrapper, styles.blobBig, floatingStyle]}
        />

        <Animated.View
          style={[styles.blobAccent, floatingStyle]}
          onTouchEnd={() => {
            activeBlobBig && setBlobTaps(prev => prev + 1);
          }}
        />

        {/* Main Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fade,
              transform: [{ translateY }, { scale }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onLongPress={() => {
              ReactNativeHapticFeedback.trigger('notificationError');
              setTitlePressed(true);
            }}
            delayLongPress={3000}
          >
            <Text style={styles.title}>Welcome</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>
            A calm, secure and delightful start
            {'\n'}to your authentication journey.
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.buttonText}>Get In</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.blobAccent2,
            floatingStyle,
            { transform: [{ rotate: spin }] },
          ]}
        />
      </Animated.View>
    </Wrapper>
  );
};

export default WelcomeScreen;
