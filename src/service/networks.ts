import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { store } from '../config/createStore';
import { apiRoutes } from './apiRoutes';

export const baseURL = 'https://dev.retailperks.onecode.technology/api/';

const api = axios.create({
  baseURL,
});

// Token Management Helpers using localStorage
export const setTokens = async (
  accessToken: string,
  refreshToken: string
): Promise<void> => {
  try {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    api.defaults.headers.common['x-refresh-token'] = refreshToken;
  } catch (error) {
    console.error('Error setting tokens:', error);
  }
};

export const removeTokens = async (): Promise<void> => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    delete api.defaults.headers.common['Authorization'];
    delete api.defaults.headers.common['x-refresh-token'];
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
};

export const initializeTokens = async (): Promise<void> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      api.defaults.headers.common['x-refresh-token'] = refreshToken;
    }
  } catch (error) {
    console.error('Error initializing tokens:', error);
  }
};

// Refresh Token Thunk
export const refreshToken = createAsyncThunk(
  'authSlice/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await post(apiRoutes.refreshToken, { refreshToken });

      if (response?.error) {
        return rejectWithValue(response.message || 'Refresh token invalid');
      }

      await setTokens(response.accessToken, response.refreshToken);
      return;
    } catch (error) {
      return rejectWithValue('Refresh token failed.');
    }
  }
);

// Axios Interceptor
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     const { auth } = store.getState() as any;

//     const isLogin = auth?.isLogin ?? false;

//     if (
//       error.response?.status === 403 &&
//       !originalRequest._retry &&
//       isLogin
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshTokenValue = localStorage.getItem('refreshToken');
//         if (!refreshTokenValue) return Promise.reject(error);

//         const response = await post(apiRoutes.refreshToken, {
//           refreshToken: refreshTokenValue,
//         });

//         if (response?.error) return Promise.reject(error);

//         await setTokens(response.accessToken, response.refreshToken);

//         originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`;
//         originalRequest.headers['x-refresh-token'] = response.refreshToken;

//         return api(originalRequest);
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// Axios Wrapper Methods
export const get = async (url: string, options = {}): Promise<any> => {
  try {
    const response = await api.get(url, options);
    return response.data;
  } catch (error: any) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
};

export const post = async (url: string, data: any): Promise<any> => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error: any) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
};

export const put = async (
  url: string,
  data?: any,
  headers?: any
): Promise<any> => {
  try {
    const response = await api.put(url, data, { headers });
    return response.data;
  } catch (error: any) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
};

export const patch = async (
  url: string,
  data?: any,
  headers?: any
): Promise<any> => {
  try {
    const response = await api.patch(url, data, { headers });
    return response.data;
  } catch (error: any) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
};

export const deleteMethod = async (
  url: string,
  token: string = ''
): Promise<any> => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error: any) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
};

export const setTokenInApp = (token: string) => {
  api.defaults.headers.common['Authorization'] = `${token}`;
};
