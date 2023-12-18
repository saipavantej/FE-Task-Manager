import {TasksScreensParamList} from '@constants/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TasksList from '@screens/tasksList';
import CreateTask from '@screens/createTask';
import TaskDetails from '@screens/taskDetails';

const Stack = createNativeStackNavigator<TasksScreensParamList>();

type Params = {};

const TasksScreens = (_params: Params) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'TasksList'}
        screenOptions={{animation: 'ios', headerShown: false}}>
        <Stack.Screen name="TasksList" component={TasksList} />
        <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
    </>
  );
};

export default TasksScreens;
