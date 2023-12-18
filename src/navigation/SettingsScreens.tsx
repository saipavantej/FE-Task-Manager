import {SettingsScreensParamList} from '@constants/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Settings from '@screens/settings';

const Stack = createNativeStackNavigator<SettingsScreensParamList>();

type Params = {};

const SettingsScreens = (_params: Params) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'Settings'}
        screenOptions={{animation: 'ios', headerShown: false}}>
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </>
  );
};

export default SettingsScreens;
