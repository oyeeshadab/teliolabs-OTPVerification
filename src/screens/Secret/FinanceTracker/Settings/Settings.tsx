import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FinanceTrackerWrapper from '@components/Wrapper/FinanceTrackerWrapper';
import Header from '@components/FinanceTracker/Header/Header';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import Text from '@components/Text/Text';
import { useTheme } from '@theme/ThemeProvider';
import { DatabaseManagerRepo } from '@database/repository/databasemanager.repo';
import { UserRepo } from '@database/repository/user.repo';
import { User } from '@database/types';
import { useSelector } from 'react-redux';

interface SettingsScreenProps {
  userName?: string;
}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  // const [user, setUser] = useState<User | null>(null);
  const user = useSelector((state: { user: { currentUser: User } }) => {
    return state.user.currentUser;
  });

  // State for settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [spendingAlerts, setSpendingAlerts] = useState(true);

  const biometricUpdate = (value: boolean) => {
    console.log('🚀 ~ biometricUpdate ~ value:', value);
    UserRepo.updateBiometricStatus(user?.email || '', value ? 1 : 0);
    setBiometricLogin(value);
  };

  // Settings sections
  const accountSettings = [
    {
      id: '1',
      icon: 'person-outline',
      title: 'Account Information',
      subtitle: 'Name, email, phone number',
      onPress: () => Alert.alert('Coming Soon', 'Account Information'),
    },
    {
      id: '2',
      icon: 'lock-closed-outline',
      title: 'Change Password',
      subtitle: 'Update your password',
      onPress: () => Alert.alert('Coming Soon', 'Change Password'),
    },
    {
      id: '3',
      icon: 'finger-print-outline',
      title: 'Biometric Login',
      subtitle: 'Use fingerprint or face ID',
      isSwitch: true,
      value: biometricLogin,
      onValueChange: biometricUpdate,
    },
  ];

  const preferencesSettings = [
    {
      id: '4',
      icon: 'logo-apple-ar',
      title: 'Categories',
      subtitle: 'Add/Edit categories.',
      // value: darkMode,
      onPress: () =>
        navigation.navigate('AppNavigator', {
          screen: 'CategoryLists',
        }),
    },
    {
      id: '5',
      icon: 'moon-outline',
      title: 'Dark Mode',
      subtitle: 'Switch between light and dark theme',
      isSwitch: true,
      value: darkMode,
      onValueChange: setDarkMode,
    },
    {
      id: '6',
      icon: 'language-outline',
      title: 'Currency',
      subtitle: 'Indian Rupee (₹)',
      onPress: () => Alert.alert('Coming Soon', 'Change Currency'),
    },
    {
      id: '7',
      icon: 'calendar-outline',
      title: 'First Day of Week',
      subtitle: 'Monday',
      onPress: () => Alert.alert('Coming Soon', 'Change First Day'),
    },
  ];

  const notificationSettings = [
    {
      id: '8',
      icon: 'notifications-outline',
      title: 'Push Notifications',
      subtitle: 'Receive transaction alerts',
      isSwitch: true,
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      id: '9',
      icon: 'mail-outline',
      title: 'Email Notifications',
      subtitle: 'Receive weekly summaries',
      isSwitch: true,
      value: emailNotifications,
      onValueChange: setEmailNotifications,
    },
    {
      id: '10',
      icon: 'trending-up-outline',
      title: 'Weekly Report',
      subtitle: 'Get spending insights every week',
      isSwitch: true,
      value: weeklyReport,
      onValueChange: setWeeklyReport,
    },
    {
      id: '11',
      icon: 'alert-circle-outline',
      title: 'Spending Alerts',
      subtitle: 'Notify when spending exceeds budget',
      isSwitch: true,
      value: spendingAlerts,
      onValueChange: setSpendingAlerts,
    },
  ];

  const dataSettings = [
    {
      id: '12',
      icon: 'cloud-upload-outline',
      title: 'Auto Sync',
      subtitle: 'Automatically sync with cloud',
      isSwitch: true,
      value: autoSync,
      onValueChange: setAutoSync,
    },
    {
      id: '13',
      icon: 'download-outline',
      title: 'Export Data',
      subtitle: 'Export all transactions as CSV',
      onPress: () => Alert.alert('Export', 'Export your data?'),
    },
    {
      id: '14',
      icon: 'trash-outline',
      title: 'Clear Data',
      subtitle: 'Reset your transactions',
      onPress: () => {
        Alert.alert(
          'Clear Data',
          'Are you sure you want to clear data?\n Data fill not recover after clear data.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Clear',
              style: 'destructive',
              onPress: async () => {
                await DatabaseManagerRepo.dropDatabase();
              },
            },
          ],
        );
      },
    },
  ];

  const supportSettings = [
    {
      id: '15',
      icon: 'help-circle-outline',
      title: 'Help Center',
      subtitle: 'FAQs and guides',
      onPress: () => Alert.alert('Coming Soon', 'Help Center'),
    },
    {
      id: '16',
      icon: 'chatbubble-outline',
      title: 'Contact Support',
      subtitle: 'Get help from our team',
      onPress: () => {
        Linking.openURL('mailto:support@financetracker.com');
      },
    },
    {
      id: '17',
      icon: 'star-outline',
      title: 'Rate Us',
      subtitle: 'Share your feedback',
      onPress: () => {
        const storeUrl =
          Platform.OS === 'ios'
            ? 'https://apps.apple.com/app/id123456789'
            : 'https://play.google.com/store/apps/details?id=com.financetracker';
        Linking.openURL(storeUrl);
      },
    },
    {
      id: '18',
      icon: 'share-social-outline',
      title: 'Share App',
      subtitle: 'Invite friends to join',
      onPress: () => Alert.alert('Share', 'Share the app with friends'),
    },
  ];

  const aboutSettings = [
    {
      id: '19',
      icon: 'information-circle-outline',
      title: 'About',
      subtitle: 'Version 1.0.0',
      onPress: () =>
        Alert.alert(
          'About',
          'Finance Tracker v1.0.0\n\nTrack your finances effortlessly',
        ),
    },
    {
      id: '20',
      icon: 'document-text-outline',
      title: 'Terms of Service',
      onPress: () => Alert.alert('Terms of Service', 'Coming soon'),
    },
    {
      id: '21',
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      onPress: () => Alert.alert('Privacy Policy', 'Coming soon'),
    },
  ];

  const renderSection = (title: string, data: any[]) => (
    <NeumorphicContainer>
      <View style={styles.section}>
        {/* <BlurView
          blurType="regular"
          blurAmount={Platform.OS === 'ios' ? 25 : 5}
          style={[StyleSheet.absoluteFill]}
        /> */}
        <Text color={theme.colors.white} style={styles.sectionTitle}>
          {title}
        </Text>
        <View style={styles.sectionContent}>
          {data.map((item, index) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.settingItem,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={item.onPress}
              disabled={item.isSwitch}
            >
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Icon name={item.icon} size={22} color={theme.colors.white} />
                </View>
                <View style={styles.settingInfo}>
                  <Text color={theme.colors.white} variant={'title'}>
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text
                      color={theme.colors.white}
                      // style={styles.settingSubtitle}
                      variant="caption"
                    >
                      {item.subtitle}
                    </Text>
                  )}
                </View>
              </View>
              {item.isSwitch ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onValueChange}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor="#FFFFFF"
                />
              ) : (
                <Icon
                  name="chevron-forward-outline"
                  size={20}
                  color="#D1D5DB"
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </NeumorphicContainer>
  );

  return (
    <FinanceTrackerWrapper padding bubble useSafeArea blob>
      <Header title="Setting" showProfile />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        {/* <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back-outline" size={24} color="#1F2937" />
          </Pressable>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View> */}

        {/* User Info */}
        <NeumorphicContainer>
          <View style={styles.userInfoCard}>
            {/* <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            /> */}
            <View style={styles.userAvatar}>
              <Text color={theme.colors.white} style={styles.avatarText}>
                {user?.name[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text color={theme.colors.white} style={styles.userName}>
                {user?.name}
              </Text>
              <Text color={theme.colors.white} style={styles.userEmail}>
                {user?.email}
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.viewProfileButton,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={() =>
                navigation.navigate('AppNavigator', {
                  screen: 'Profile',
                })
              }
            >
              <Text style={styles.viewProfileText}>View Profile</Text>
            </Pressable>
          </View>
        </NeumorphicContainer>

        {/* Settings Sections */}
        {renderSection('Account', accountSettings)}
        {renderSection('Preferences', preferencesSettings)}
        {renderSection('Notifications', notificationSettings)}
        {renderSection('Data & Storage', dataSettings)}
        {renderSection('Support', supportSettings)}
        {renderSection('About', aboutSettings)}

        {/* Logout Button */}
        {/* <Pressable style={styles.logoutButton}>
        <Icon name="log-out-outline" size={22} color="#EF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable> */}

        {/* Version */}
        {/* <Text style={styles.versionText}>Finance Tracker v1.0.0</Text> */}
      </ScrollView>
    </FinanceTrackerWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Dimensions.get('window').height / 5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 32,
  },
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    // marginTop: 16,
    // marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',

    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
  },
  viewProfileButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  viewProfileText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    // color: '#6B7280',
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    // backgroundColor: '#FFFFFF',
    borderRadius: 16,
    // overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ffffff',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    // color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 20,
    marginBottom: 30,
  },
});

export default SettingsScreen;
