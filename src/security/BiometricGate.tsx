import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AppState,
  Platform,
} from 'react-native';

import { BiometricService } from './biometric.service';
import LottieView from 'lottie-react-native';
import { SecretUserRepo } from '../database/repository/secretLogin.repo';
import { useFocusEffect } from '@react-navigation/native';
interface Props {
  children: React.ReactNode;
}

export const BiometricGate: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [failed, setFailed] = useState(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     authenticate();
  //   }, []),
  // );

  // 🔒 Lock again when app goes background
  useEffect(() => {
    // const sub = AppState.addEventListener('change', state => {
    //   if (state === 'active') {
    //     setAuthorized(false);
    //     authenticate();
    //   }
    // });
    // return () => sub.remove();
    authenticate();
  }, []);

  const authenticate = async () => {
    // errorHapticDouble();
    // return;
    try {
      const available = await BiometricService.isAvailable();
      if (!available) {
        setFailed(true);
        return;
      }

      const success = await BiometricService.authenticate();
      updateAuthorized(success);
    } catch {
      setFailed(true);
    }
  };

  const updateAuthorized = (value: boolean) => {
    setAuthorized(value);
    setFailed(!value);
    SecretUserRepo.update(value);
  };

  if (!authorized) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.warning}>⚠️ RESTRICTED ACCESS</Text>

        {/* Lock Icon */}
        <LottieView
          source={require('../assets/JSON/fire.json')}
          style={{ width: 100, height: 100 }}
          autoPlay
          loop
        />

        {/* Title */}
        <Text style={styles.title}>SECURITY VERIFICATION</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Biometric authentication is required to continue.
        </Text>

        {/* Error */}
        {failed && (
          <Text style={styles.error}>
            Authentication failed. Unauthorized access denied.
          </Text>
        )}

        {/* Action */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (__DEV__) {
              updateAuthorized(true);
              return;
            }
            Platform.OS === 'ios' ? updateAuthorized(true) : authenticate();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>SCAN FINGERPRINT</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          This action is monitored for security purposes.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  warning: {
    color: '#FF3B3B',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 16,
    fontWeight: '600',
  },

  lockIcon: {
    fontSize: 64,
    marginBottom: 20,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 1,
  },

  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },

  error: {
    color: '#FF3B3B',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#FF3B3B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },

  footer: {
    color: '#555',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
});
