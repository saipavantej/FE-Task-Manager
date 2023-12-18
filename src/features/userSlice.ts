import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  forgetPasswordApi,
  loginApi,
  resetPasswordApi,
  signUpApi,
} from '../services';
import {navigate, replace} from '@navigation/NavService';
import {showErrorToast, showSuccessToast} from '@components/Toast/action';
import {setMultipleItems} from '@utils/asyncStorage';
import {addUser} from '../database/query';

export type user = {
  user_id: string;
  name: string;
  user_picture: string;
  email_id: string;
  token?: string;
};

export type userState = {
  data: user;
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

type forgetPasswordBody = {
  email_id: string;
};

type resetPasswordBody = {
  otp: string;
  email_id: string;
  password: string;
};
type editProfileBody = {
  user_id: string;
  user_name?: string;
  picture?: string;
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

const transformApiResponse = (
  type: 'login' | 'signup' | 'editProfile',
  apiResponse: any,
): any => {
  switch (type) {
    case 'editProfile':
      return {
        id: apiResponse.response.user_id,
        name: apiResponse.response.username,
        picture: apiResponse.response.picture,
        emailId: apiResponse.response.email_id,
      };
    default:
      setMultipleItems([
        ['token', apiResponse.token],
        ['userId', apiResponse.response.user_id],
      ]).then(() => {
        addUser({
          user_id: apiResponse.response.user_id,
          user_name: apiResponse.response.username,
          user_picture: apiResponse.response.picture,
          email_id: apiResponse.response.email_id,
          successCallback: _e => {
            replace('MainStack');
          },
          errorCallback: e => {
            showErrorToast(e);
          },
        });
      });
      return {
        user_id: apiResponse.response.user_id,
        name: apiResponse.response.username,
        user_picture: apiResponse.response.picture,
        email_id: apiResponse.response.email_id,
        token: apiResponse.token,
      };
  }
};

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

export const forgetPasswordAsync = createAsyncThunk(
  'user/forgetPassword',
  async (body: forgetPasswordBody) => {
    try {
      const response = await forgetPasswordApi(body);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (body: resetPasswordBody) => {
    try {
      const response = await resetPasswordApi(body);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const editPasswordAsync = createAsyncThunk(
  'user/editPassword',
  async (body: editProfileBody) => {
    try {
      const response = await resetPasswordApi(body);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: userState = {
  data: {
    user_id: '',
    name: '',
    user_picture: '',
    email_id: '',
  },
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Login
    builder
      .addCase(userLoginAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = 'succeeded';
          state.error = action.payload.message;
          showErrorToast(action.payload.message);
          return;
        } else {
          state.status = 'succeeded';
          state.data = transformApiResponse('login', action.payload);
        }
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ||
          'An error occurred while login please try again!';
        showErrorToast(
          action.error.message ||
            'An error occurred while signUp please try again!',
        );
      });
    // SignUp
    builder
      .addCase(userSignUpAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userSignUpAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = 'succeeded';
          state.error = action.payload.message;
          showErrorToast(action.payload.message);
          return;
        } else {
          state.status = 'succeeded';
          state.data = transformApiResponse('signup', action.payload);
        }
      })
      .addCase(userSignUpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ||
          'An error occurred while signUp please try again!';
        showErrorToast(
          action.error.message ||
            'An error occurred while signUp please try again!',
        );
      });
    // forget password
    builder
      .addCase(forgetPasswordAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(forgetPasswordAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = 'succeeded';
          state.error = action.payload.message;
          showErrorToast(action.payload.message);
          return;
        } else {
          state.status = 'succeeded';
          showSuccessToast(action.payload.message);
          setTimeout(() => {
            navigate('ResetPassword', {email: action.meta.arg.email_id});
          }, 200);
        }
      })
      .addCase(forgetPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ||
          'An error occurred while sending OTP please try again!';
        showErrorToast(
          action.error.message ||
            'An error occurred while sending OTP please try again!',
        );
      });
    // reset password
    builder
      .addCase(resetPasswordAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = 'succeeded';
          state.error = action.payload.message;
          showErrorToast(
            action.payload.message ||
              'An error occurred while password reset please try again!',
          );
          return;
        } else {
          state.status = 'succeeded';
          showSuccessToast(action.payload.message);
          setTimeout(() => {
            navigate('Login');
          }, 200);
        }
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ||
          'An error occurred while password reset please try again!';
        showErrorToast(
          action.error.message ||
            'An error occurred while password reset  please try again!',
        );
      });

    builder
      .addCase(editPasswordAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(editPasswordAsync.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = 'succeeded';
          state.error = action.payload.message;
          showErrorToast(
            action.payload.message ||
              'An error occurred while update profile details please try again!',
          );
          return;
        } else {
          state.status = 'succeeded';
          showSuccessToast(action.payload.message);
        }
      })
      .addCase(editPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ||
          'An error occurred while editing profile details please try again!';
        showErrorToast(
          action.error.message ||
            'An error occurred while editing profile details please try again!!',
        );
      });
  },
});

export const userReducer = userSlice.reducer;
export default userSlice;
