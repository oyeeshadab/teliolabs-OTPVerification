import { useState } from 'react';
import { useToast } from '../../components/Toast/useToast';
import { UserRepo } from '@database/repository/user.repo';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/RootNavigator';
import { store } from '@redux/store';
import { setUser } from '@redux/store/userSlice';

type NavigationProps = NavigationProp<RootStackParamList>;

export const useWelcomeAnimation = () => {
  const [name, setName] = useState(__DEV__ ? 'Shadab' : '');
  const [email, setEmail] = useState(__DEV__ ? 'shadab@quasarbytes.com' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const { show } = useToast();

  const [titlePressed, setTitlePressed] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('🚀 ~ handleEmailChange ~ text:', emailRegex.test(text));

    if (text && !emailRegex.test(text)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  // New function to handle user authentication
  const handleAuth = async () => {
    if (!email) {
      show('Please enter your email', 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      show('Please enter a valid email address', 3000);
      return;
    }

    if (!name) {
      show('Please enter your name', 3000);
      return;
    }

    setLoading(true);
    try {
      // This will either get existing user or create new one
      const authenticatedUser = await UserRepo.getOrCreateUser({ name, email });
      console.log('🚀 ~ handleAuth ~ authenticatedUser:', authenticatedUser);
      if (authenticatedUser?.hasOwnProperty('email')) {
        store.dispatch(setUser(authenticatedUser || null));
        navigation?.replace('SecretNavigator');
      }
    } catch (err) {
      console.error('Auth error:', err);
      show('Authentication failed. Please try again.', 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    loading,
    setName,
    handleEmailChange,
    handleAuth,
    error,
    titlePressed,
    setTitlePressed,
  };
};
