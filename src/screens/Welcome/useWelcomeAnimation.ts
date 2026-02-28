import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { useToast } from '../../components/Toast/useToast';

export const useWelcomeAnimation = () => {
  // Main intro animation
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(40)).current;
  const { show } = useToast();

  // Floating blobs
  const float = useRef(new Animated.Value(0)).current;

  // Secret magic
  const secretOpacity = useRef(new Animated.Value(0)).current;

  const [titlePressed, setTitlePressed] = useState(false);
  const [blobTaps, setBlobTaps] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [activeBlobBig, setActiveBlobBig] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    if (activeBlobBig && titlePressed && blobTaps >= 4 && !secretUnlocked) {
      setSecretUnlocked(true);

      Animated.timing(secretOpacity, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setSecretUnlocked(false);
        setBlobTaps(0);
        setTitlePressed(false);
        setActiveBlobBig(false);
        show('🪄 Secret Locked again! 🪄\n Make the magic happen', 5000);
      }, 5000);
    }
  }, [titlePressed, blobTaps]);

  const floatingStyle = {
    transform: [
      {
        translateY: float.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -22],
        }),
      },
    ],
  };

  return {
    fade,
    scale,
    translateY,
    floatingStyle,

    // secret
    blobTaps,
    titlePressed,
    secretOpacity,
    activeBlobBig,
    setTitlePressed,
    setActiveBlobBig,
    setBlobTaps,
    secretUnlocked,
  };
};
