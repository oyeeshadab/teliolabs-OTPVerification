import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { useStyle } from './styles';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: React.ReactNode;
  padding?: boolean;
  bubble?: boolean;
  useSafeArea?: boolean;
};

const FinanceTrackerWrapper = ({
  children,
  padding = false,
  bubble = false,
  useSafeArea = false,
}: Props) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const Container = useSafeArea ? RNSafeAreaView : View;

  return (
    <Container style={styles.container}>
      {bubble && (
        <>
          <LinearGradient
            colors={['#6578C8', '#C8CAEF']}
            style={styles.topBlob}
          />
        </>
      )}
      <View style={padding && styles.padding}>{children}</View>
    </Container>
  );
};

export default FinanceTrackerWrapper;
