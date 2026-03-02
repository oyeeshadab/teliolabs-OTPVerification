import { View, Text } from 'react-native';
import React from 'react';
import { useStyle } from './styles';
import { useTheme } from '../../theme/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const Wrapper = ({
  children,
  padding,
}: {
  children: React.ReactNode;
  padding?: boolean;
}) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  return (
    <View style={[styles.container, padding && styles.padding]}>
      {children}
    </View>
  );
};

export default Wrapper;
