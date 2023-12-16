/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
if (!__DEV__) {
  console.log = () => null;
}
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
