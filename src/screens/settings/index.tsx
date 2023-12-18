import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SettingsScreensParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {removeAllItems} from '@utils/asyncStorage';
import {replace} from '@navigation/NavService';
import PageView from '@components/pageView';
import AppButton from '@components/appButton/AppButton';

type Props = NativeStackScreenProps<SettingsScreensParamList, 'Settings'>;

const Settings = ({navigation}: Props) => {
  return (
    <PageView
      headerText="Settings"
      safeAreaView
      type={'withHeader'}
      backgroundColor="WHITE"
      showHeader>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppButton
          name="logout"
          onPress={() => removeAllItems().then(() => replace('AuthStack'))}
        />
      </View>
    </PageView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
