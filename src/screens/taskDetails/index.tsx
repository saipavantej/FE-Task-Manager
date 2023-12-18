import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TasksScreensParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<TasksScreensParamList, 'TaskDetails'>;

const TaskDetails = ({}: Props) => {
  return (
    <View>
      <Text>TaskDetails</Text>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({});
