import React from 'react';
import {BottomTabBarParamList} from '@constants/routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '@components/bottomTabBar/BottomTabBar';
import TasksScreens from './TasksScreens';
import SettingsScreens from './SettingsScreens';

const Tab = createBottomTabNavigator<BottomTabBarParamList>();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, lazy: true}}
      tabBar={tabProps => <BottomTabBar {...tabProps} />}>
      <Tab.Screen name={'TasksScreens'} component={TasksScreens} />
      <Tab.Screen name={'SettingsScreens'} component={SettingsScreens} />
    </Tab.Navigator>
  );
}
