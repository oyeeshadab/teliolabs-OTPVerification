import React, { useEffect } from 'react';
import {
  Text,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { styles } from './styles';
import { useWelcomeAnimation } from './useWelcomeAnimation';
import { insertUser, getUsers } from '../../database/user.repository';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const WelcomeScreen = ({ navigation }: any) => {
  const {
    fade,
    scale,
    blobTaps,
    translateY,
    titlePressed,
    activeBlobBig,
    floatingStyle,
    setActiveBlobBig,
    setTitlePressed,
    setBlobTaps,
    secretUnlocked,
  } = useWelcomeAnimation();

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
            // navigation.replace('SecretNavigator');
            navigation.replace('SecretNavigator', {
              screen: 'Target',
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

  const saveUser = async () => {
    await insertUser('Shadab', Math.floor(Math.random() * 99999) + 1);
  };

  const loadUsers = async () => {
    const users = await getUsers();
    console.log(users);
  };

  return (
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
        }}
        delayLongPress={3000}
        style={[styles.touchWrapper, styles.blobBig, floatingStyle]}
      />

      <Animated.View
        style={[styles.blobAccent, floatingStyle]}
        onTouchEnd={() => setBlobTaps(prev => prev + 1)}
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
        <Text
          style={styles.title}
          onLongPress={() => setTitlePressed(true)}
          // delayLongPress={1200}
        >
          Welcome
        </Text>

        <Text style={styles.subtitle}>
          A calm, secure and delightful start
          {'\n'}to your authentication journey.
        </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={
            activeBlobBig
              ? () => setBlobTaps(prev => prev + 1)
              : () => {
                  // navigation.replace('Login');
                  saveUser();
                  setTimeout(() => {
                    loadUsers();
                  }, 3000);
                }
          }
        >
          <Text style={styles.buttonText}>
            {blobTaps >= 4
              ? 'Swipe up to unlock the magic!🪄'
              : activeBlobBig
              ? 'Secret Unlocked!'
              : 'Get In'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.blobAccent2,
          floatingStyle,
          { transform: [{ rotate: spin }] },
        ]}
        onTouchEnd={() => setBlobTaps(prev => prev + 1)}
      />
    </Animated.View>
  );
};

export default WelcomeScreen;
