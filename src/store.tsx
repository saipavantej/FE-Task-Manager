import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './features/user-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;

export default store;
