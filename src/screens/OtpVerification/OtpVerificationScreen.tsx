import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { OtpInput } from './OtpInput';
import { useOtpTimer } from '../../hooks/useOtpTimer';
import { delay } from '../../utils/delay';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { useStyle } from './styles';
import { useTheme } from '../../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'OtpVerification'>;

export const OtpVerificationScreen = ({ route, navigation }: Props) => {
  const { email } = route.params;
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const styles = useStyle(theme);

  const { secondsLeft, canResend, resetTimer } = useOtpTimer(60);

  const isComplete = otp.every(d => d !== '');

  const handleVerify = async () => {
    if (!isComplete) return;

    setLoading(true);
    await delay(1500);
    console.log('🚀 ~ handleVerify ~ otp:', otp);
    setLoading(false);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <ThemeToggle />

      <Text style={styles.title}>OTP Verification</Text>

      <Text style={styles.subtitle}>
        Enter the verification code we just sent you on
      </Text>

      <Text style={styles.email}>{email}</Text>

      <OtpInput value={otp} onChange={setOtp} />

      <TouchableOpacity
        onPress={handleVerify}
        disabled={!isComplete || loading}
        style={[
          styles.button,
          {
            backgroundColor: isComplete
              ? theme.colors.buttonEnabled
              : theme.colors.buttonDisabled,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator size={'small'} color={theme.colors.background} />
        ) : (
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify'}
          </Text>
        )}
      </TouchableOpacity>

      {/* <View style={styles.resendContainer}>
        {canResend ? (
          <TouchableOpacity onPress={resetTimer}>
            <Text>Didn't recieve the code? Resend</Text>
          </TouchableOpacity>
        ) : (
          <Text>Resend code in {secondsLeft}s</Text>
        )}
      </View> */}
      <View style={styles.resendContainer}>
        {canResend ? (
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <Text style={styles.resendLink} onPress={resetTimer}>
              Resend
            </Text>
          </Text>
        ) : (
          <Text style={styles.timerText}>Resend code in {secondsLeft}s</Text>
        )}
      </View>
    </View>
  );
};
