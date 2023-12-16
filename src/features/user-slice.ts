import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginApi, signUpApi} from '../services';

export type userState = {
  data: {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

type loginBody = {
  password: string;
  email_id: string;
};

type signUpBody = {
  password: string;
  user_name: string;
  email_id: string;
};

export const userLoginAsync = createAsyncThunk(
  'user/login',
  async (body: loginBody) => {
    try {
      const response = await loginApi(body);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const userSignUpAsync = createAsyncThunk(
  'user/signup',
  async (body: signUpBody) => {
    try {
      const response = await signUpApi(body);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: userState = {
  data: {},
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLoginAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ||
          'An error occurred while login please try again!';
      });
    builder
      .addCase(userSignUpAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userSignUpAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(userSignUpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ||
          'An error occurred while signUp please try again!';
      });
  },
});

export const userReducer = userSlice.reducer;
export default userSlice;
