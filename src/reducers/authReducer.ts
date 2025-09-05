import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {apiRoutes} from '../service/apiRoutes';
import {get, post, removeTokens, setTokens} from '../service/networks';

interface CompanyInfo {
  uuid: string;
  name: string;
  status: string;
}

interface UserInfo {
  uuid: string;
  fullName: string;
  status: string;
}

interface CompanyMapping {
  uuid: string;
  role: string;
  companyInfo: CompanyInfo;
  userInfo: UserInfo;
}

interface User {
  uuid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  companyMapping: CompanyMapping;
}

interface _AuthState {
  userData: CompanyMapping | null;
  isLogin: boolean;
  isNewUser: boolean;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: _AuthState = {
  userData: null,
  isLogin: false,
  isNewUser: false,
  loading: false,
  error: null,
  message: null,
};

export const resetAll = createAction('resetAll');

export const onUserLogin = createAsyncThunk(
  'authSlice/login',
  async (
    userData: {
      phoneNumber: string;
      password: string;
    },
    {rejectWithValue},
  ) => {
    try {
      // console.log('userData', userData);
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await post(apiRoutes.signIn, userData);
      // console.log('response', response);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.accessToken) {
        return response;
      }
      return rejectWithValue('Unexpected response format');
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  },
);

export const onUserSignUp = createAsyncThunk(
  'authSlice/signup',
  async (
    userData: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      password: string;
      companyAdminLoginCode?: string;
      companyUserLoginCode?: string;
    },
    {rejectWithValue},
  ) => {
    try {
      // console.log('userData', userData);
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await post(apiRoutes.signUp, userData);
      // console.log('response', response);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.userId) {
        return response;
      }
      return rejectWithValue('Unexpected response format');
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  },
);

export const onPasswordReset = createAsyncThunk(
  'authSlice/passwordReset',
  async (
    userData: {
      password: string;
      phoneNumber: string;
      companyAdminLoginCode?: string;
      companyUserLoginCode?: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    try {
      console.log('userData', userData);
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await post(`${apiRoutes.passwordReset}`, userData);
      console.log('response', response);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.user) {
        return response;
      }
      return rejectWithValue('Unexpected response format');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const onUserLogOut = createAsyncThunk(
  'authSlice/logout',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      await removeTokens();
      dispatch(resetAll());
      return 'Sign-Out successfully.';
    } catch (error) {
      return rejectWithValue('Sign-Out failed');
    }
  },
);

export const onGetProfile = createAsyncThunk(
  'userSlice/getProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await get(apiRoutes.getProfile);
      console.log('profile details', response);
      return response;
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to fetch user profile');
    }
  },
);

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    clearAuth: state => {
      state.loading = false;
      state.isLogin = false;
      state.error = null;
      state.message = null;
      // removeTokens();
    },
    clearNewUser: state => {
      state.isNewUser = false;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
    dummyLogin: state => {
      state.isLogin = true;
    },
    dummyLogout: state => {
      state.isLogin = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(resetAll, () => initialState)
      .addCase(onUserLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(onUserLogin.fulfilled, (state, action) => {
        state.isLogin = true;
        setTokens(action.payload.accessToken, action.payload.refreshToken);
        state.message = 'Signed in successfully.';
        state.userData = action.payload.companyMapping;
        state.loading = false;
        state.error = null;
      })
      .addCase(onUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onUserSignUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(onUserSignUp.fulfilled, (state, action) => {
        state.message = 'Account created successfully.';
        state.loading = false;
        state.error = null;
      })
      .addCase(onUserSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = 'Password reset successfully.';
        setTokens(action.payload.accessToken, action.payload.refreshToken);
      })
      .addCase(onPasswordReset.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(onPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onUserLogOut.pending, state => {
        state.loading = true;
      })
      .addCase(onUserLogOut.fulfilled, state => {
        state.loading = false;
        state.isLogin = false;
        state.message = 'Logout successful';
        state.error = null;
      })
      .addCase(onUserLogOut.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onGetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.companyMapping;
      })
      .addCase(onGetProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onGetProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      });
  },
});

export const {
  clearAuth,
  clearNewUser,
  clearError,
  clearMessage,
  dummyLogin,
  dummyLogout,
} = authSlice.actions;

export default authSlice.reducer;
