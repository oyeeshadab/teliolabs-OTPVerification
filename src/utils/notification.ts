import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

/**
 * ANDROID: Create notification channel (sound depends on this)
 * Call ONCE at app startup
 */
export async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });
}

/**
 * Request permissions (Android 13+ & iOS)
 */
export async function requestNotificationPermission() {
  await notifee.requestPermission();
  await messaging().requestPermission();
  registerForegroundHandler();
}

/**
 * Get FCM token
 */
export async function getFcmToken(): Promise<string | null> {
  try {
    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);
    return token;
  } catch (e) {
    console.log('FCM TOKEN ERROR:', e);
    return null;
  }
}

/**
 * Show local notification (used everywhere)
 */
export async function showLocalNotification(
  title: string,
  body: string,
  data: any = {},
) {
  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'default',
    },
  });
}

/**
 * FOREGROUND FCM HANDLER
 */
export function registerForegroundHandler() {
  return messaging().onMessage(async remoteMessage => {
    const title =
      remoteMessage?.data?.title ||
      remoteMessage?.notification?.title ||
      'Notification';

    const body =
      remoteMessage.data?.body || remoteMessage.notification?.body || '';

    await showLocalNotification(title, body, remoteMessage.data);
  });
}

/**
 * BACKGROUND & KILLED (ANDROID)
 * MUST be outside component (index.js)
 */
export async function backgroundMessageHandler(remoteMessage: any) {
  const title =
    remoteMessage.data?.title ||
    remoteMessage.notification?.title ||
    'Notification';

  const body =
    remoteMessage.data?.body || remoteMessage.notification?.body || '';

  await showLocalNotification(title, body, remoteMessage.data);
}

/**
 * Handle notification click (foreground)
 */
export function registerNotificationClickHandler(
  callback: (data: any) => void,
) {
  return notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      callback(detail.notification?.data);
    }
  });
}

/**
 * Handle notification click (killed / quit state)
 */
export async function handleInitialNotification(callback: (data: any) => void) {
  const message = await messaging().getInitialNotification();
  if (message) {
    callback(message.data);
  }
}
