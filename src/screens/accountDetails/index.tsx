import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainStackParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MainStackParamList, 'AccountDetails'>;

const AccountDetails = (props: Props) => {
  return (
    <View>
      <Text>AccountDetails</Text>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({});
