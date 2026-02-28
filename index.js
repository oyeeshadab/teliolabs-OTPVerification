/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { backgroundMessageHandler } from './src/utils/notification';

messaging().setBackgroundMessageHandler(backgroundMessageHandler);
AppRegistry.registerComponent(appName, () => App);
