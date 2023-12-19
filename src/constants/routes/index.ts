export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  ForgetPassword: undefined;
  SignUp: undefined;
  ResetPassword: {email: string};
};

export type MainStackParamList = {
  BottomTabStack: undefined;
  AccountDetails: undefined;
};

export type BottomTabBarParamList = {
  TasksScreens: undefined;
  SettingsScreens: undefined;
};

export type TasksScreensParamList = {
  TasksList: undefined;
  TaskDetails: {task_id: number};
  CreateTask: undefined;
};

export type SettingsScreensParamList = {
  Settings: undefined;
};
