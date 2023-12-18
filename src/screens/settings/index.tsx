import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SettingsScreensParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {removeAllItems} from '@utils/asyncStorage';
import {replace} from '@navigation/NavService';
import PageView from '@components/pageView';

type Props = NativeStackScreenProps<SettingsScreensParamList, 'Settings'>;

const Settings = ({navigation}: Props) => {
  return (
    <PageView
      headerText="Settings"
      safeAreaView
      type={'withHeader'}
      backgroundColor="WHITE"
      showHeader>
      <TouchableOpacity
        onPress={() => removeAllItems().then(() => replace('AuthStack'))}>
        <Text> logout</Text>
      </TouchableOpacity>
    </PageView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
