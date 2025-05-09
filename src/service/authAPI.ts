import axios from 'axios';

// import DeviceInfo from 'react-native-device-info';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { baseURL } from './networks';

const AuthApi = (token?: string) =>
  axios.create({
    baseURL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

export const errorResponse = (error: any, from: string): any => {
  if (error?.response) {
    console.log('error resp..', error.response.data, error.response);
    if (error.response.data?.length === 0) {
      switch (from) {
        case 'Login':
          return {error: 'Confirm your mail please'};
        case 'Singup':
          return {error: 'Details already there'};
        case 'ForgotPwd':
          return {error: 'Reset error'};
        case 'Logout':
          return {error: 'Logout error'};
        case 'GoogleLogin':
          return {error: 'Google Login error'};
        default:
          return {error: 'error'};
      }
    }
    return error.response.data;
  } else if (error?.message) {
    return {error: error.message};
  }
  const errorMsg = error.toJSON();
  return {error: errorMsg.message};
};

const paths = {
  forceLogout: (id: string) => `api/home/forceLogout.json?id=${id}`,
  pwdChange: (id: string) => `users/${id}/updatePassword.json`,
  signIn: `users/sign_in.json`,
  googleLogin: `users/auth/google_oauth2/callback.json`,
  signUp: `users.json`,
  signOut: `users/sign_out.json`,
  password: `users/password.json`,
  addFireToken: `api/tokenUpdate.json`,
};

// export const userLoginService = async param => {
//   const {user} = param;
//   const data = JSON.stringify({
//     user: {...user, token: DeviceInfo.getUniqueId()},
//   });
//   const url = paths.signIn;
//   // console.log('Login request..', data, url);
//   try {
//     const response = await AuthApi().post(url, data, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache',
//       },
//     });
//     // console.log('Login Respos..', response);
//     return response.data;
//   } catch (error) {
//     console.log('error...', error);
//     return errorResponse(error, 'Login');
//   }
// };

export const userLogoutService = async (param: {
  authToken: string;
  deviceToken: string;
}) => {
  const {authToken, deviceToken} = param;
  const url = paths.signOut;
  const data = {
    user: {
      token: deviceToken,
    },
  };
  // console.log('url', url, data);
  try {
    const response = await AuthApi(authToken).delete(url, {
      data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const result = response.data;
    // console.log('resutl..', response);
    return result;
  } catch (error) {
    // console.log('resp..', error);
    return errorResponse(error, 'Logout');
  }
};

export const userForgotPasswordService = async (param: {
  user: {email: string};
}) => {
  const url = paths.password;
  try {
    const response = await AuthApi().post(url, param);
    return response.data;
  } catch (error) {
    return errorResponse(error, 'ForgotPwd');
  }
};

export const addDeviceToken = async ({
  authToken,
  newToken,
  oldToken,
}: {
  authToken: string;
  newToken: string;
  oldToken: string;
}) => {
  const url = paths.addFireToken;
  try {
    const response = await AuthApi().put(
      url,
      {user: {newToken, oldToken}},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return errorResponse(error, 'Token update');
  }
};

export const clearSessions = async (params: {id: string}): Promise<any> => {
  const url = paths.forceLogout(params.id);
  return await AuthApi().post(url, {});
};

export const changePwd = async (params: {
  id: string;
  token: string;
  user: {
    password: string;
    password_confirmation: string;
    current_password: string;
  };
}) => {
  const url = paths.pwdChange(params.id);
  return await AuthApi(params.token).post(url, {user: params.user});
};
