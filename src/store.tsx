import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './features/userSlice';
import {taskReducer} from './features/tasksSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;

export default store;
