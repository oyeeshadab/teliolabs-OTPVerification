import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useStyle } from './styles';
import { delay } from '../../utils/delay';
import { useEmailValidation } from '../../hooks/useEmailValidation';
import { useTheme } from '../../theme/ThemeProvider';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const styles = useStyle(theme);

  const { isValidEmail } = useEmailValidation(email);

  const handleContinue = async () => {
    if (!isValidEmail) return;

    setLoading(true);
    await delay(1500);
    setLoading(false);
    navigation.replace('OtpVerification', { email });
  };

  return (
    <>
      <View style={styles.container}>
        <ThemeToggle />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a verification code
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, { color: theme.colors.text }]}
          placeholderTextColor={theme.colors.muted}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleContinue}
          disabled={!isValidEmail || loading}
          style={[
            styles.button,
            {
              backgroundColor: isValidEmail
                ? theme.colors.buttonEnabled
                : theme.colors.buttonDisabled,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={theme.colors.background} />
          ) : (
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : 'Login'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
