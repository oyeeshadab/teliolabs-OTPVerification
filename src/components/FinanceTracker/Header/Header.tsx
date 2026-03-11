import { View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';
import Text from '@components/Text/Text';

const Header = () => {
  const { theme } = useTheme();
  const styles = useStyle(theme);

  return (
    <View style={styles.container}>
      <View>
        <Text color="#fff" weight="deliusR" variant="h3">
          Welcome Back
        </Text>
        <Text color="#fff" weight="deliusR" variant="title">
          Shadab
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.profileImageContainer}
        >
          <Text style={{ color: 'white' }}>SH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
