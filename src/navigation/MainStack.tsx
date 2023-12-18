import {MainStackParamList} from '@constants/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomTab from './BottomTab';
import Account from '@screens/accountDetails';

const Stack = createNativeStackNavigator<MainStackParamList>();

type Params = {};

const MainStack = (_params: Params) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'BottomTabStack'}
        screenOptions={{animation: 'ios', headerShown: false}}>
        <Stack.Screen name="BottomTabStack" component={BottomTab} />
        <Stack.Screen name="AccountDetails" component={Account} />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
