// import { Buffer } from 'buffer';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiRoutes } from '../service/apiRoutes';
import { get, patch, post, put } from '../service/networks';
// import { resetAll } from './authReducer';

interface UserInfo {
  uuid: string;
  fullName: string;
  status: string;
  phoneNumber: string;
}

interface CompanyUser {
  uuid: string;
  user: string;
  role: string;
  userInfo: UserInfo;
}

interface Query {
  page: number;
}

interface CompanyUsersResponse {
  companyUsers: CompanyUser[];
  count: number;
  pages: number;
  query: Query;
}

interface CompanyUserDetail {
  uuid: string;
  user: string;
  company: string;
  role: string;
  userLoginCode: string;
  createdAt: string;
  updatedAt: string;
  userInfo: UserInfo;
}

interface CompanyInfo {
  uuid: string;
  name: string;
}

interface Customer {
  uuid: string;
  fullName: string;
  publicId: string;
  phoneNumber: string;
  currentPoints: number;
  createdAt: string;
  company?: string;
  companyInfo?: CompanyInfo;
}

interface CustomerData {
  customer: Customer;
  history: any[];
}

interface CompanyReward {
  uuid: string;
  rewardText: string;
  points: number;
  order: number;
}

interface UserRewardEligibility {
  uuid: string;
  eligible: number;
}

interface CustomerRewardsData {
  customer: Customer;
  companyRewardsInfo: CompanyReward[];
  userRewardEligibility: UserRewardEligibility[];
}

interface CustomerResponse {
  customers: Customer[];
  count: number;
  pages: number;
  query: {
    page: number;
  };
}

interface _initialState {
  userImage: any | null;
  companyWorkerListData: CompanyUsersResponse | null;
  companyCustomerListData: CustomerResponse | null;
  customerHistoryData: CustomerData | null;
  customerRewardsData: CustomerRewardsData | null;
  workerDetailData: CompanyUserDetail | null;
  loading: boolean;
  error: any;
  message: string | null;
}

const initialState: _initialState = {
  userImage: null,
  companyWorkerListData: null,
  companyCustomerListData: null,
  customerHistoryData: null,
  customerRewardsData: null,
  workerDetailData: null,
  loading: false,
  error: null,
  message: null,
};

// export const onGetProfile = createAsyncThunk(
//   'userSlice/getProfile',
//   async (_, {rejectWithValue, getState}) => {
//     const {
//       auth: {userData: companyMapping},
//     } = getState() as {auth: any};
//     const comId = companyMapping.companyInfo.uuid;
//     const userId = companyMapping.userInfo.uuid;
//     try {
//       const response = await get(apiRoutes.getProfile(comId, userId));
//       console.log('profile details', response);
//       return response;
//     } catch (error) {
//       // console.log('error', error);
//       return rejectWithValue('Failed to fetch user profile');
//     }
//   },
// );

export const onAddUser = createAsyncThunk(
  'userSlice/addUser',
  async (
    userData: {
      fullName: string;
      phoneNumber: string;
      companyUserLoginCode: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
    } = getState() as {auth: any};
    const id = companyMapping.companyInfo.uuid;
    try {
      const response = await post(apiRoutes.worker(id), userData);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.user) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to create worker');
    }
  },
);

export const onGetCompanyWorkers = createAsyncThunk(
  'userSlice/companyWorkers',
  async (
    userData: {
      page: number;
      search: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
    } = getState() as {auth: any};
    const id = companyMapping.companyInfo.uuid;
    try {
      const queryParams = new URLSearchParams({
        page: userData.page.toString(),
        ...(userData.search.length > 0 && {search: userData.search}),
      }).toString();
      const response = await get(
        `${apiRoutes.companyWorkerList(id)}?${queryParams}`,
      );
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.companyUsers) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to get users list');
    }
  },
);

export const onGetWorkerDetail = createAsyncThunk(
  'userSlice/workerDetail',
  async (id: string, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
    } = getState() as {auth: any};
    const comId = companyMapping.companyInfo.uuid;
    try {
      const response = await get(apiRoutes.workerDetail(comId, id));
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.user) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to fetch user profile');
    }
  },
);

export const onUpdateWorkerDetail = createAsyncThunk(
  'userSlice/updateWorkerDetail',
  async (
    userData: {
      fullName: string;
      phoneNumber: string;
      role: string;
      status: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    try {
      const {
        user: {workerDetailData},
        auth: {userData: companyMapping},
      } = getState() as {user: _initialState; auth: any};
      const user = workerDetailData ? workerDetailData.user : "";
      const comId = companyMapping.companyInfo.uuid;
      const response = await patch(
        apiRoutes.updateWorker(comId, user),
        userData,
      );
      if (response.message) {
        return rejectWithValue(response.message || 'Failed to update user');
      }
      if (response.user) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to update user');
    }
  },
);

export const onUpdateProfileDetail = createAsyncThunk(
  'userSlice/updateProfileDetail',
  async (
    userData: {
      fullName: string;
      phoneNumber?: string;
      role?: string;
      status?: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
    } = getState() as {auth: any};
    const comId = companyMapping.companyInfo.uuid;
    const userId = companyMapping.userInfo.uuid;
    try {
      const response = await patch(
        apiRoutes.updateProfile(comId, userId),
        userData,
      );
      if (response.message) {
        return rejectWithValue(response.message || 'Failed to update user');
      }
      // console.log('update profile', response);
      if (response.user) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to update user');
    }
  },
);

export const onUpdateProfileImage = createAsyncThunk(
  'userSlice/updateProfileImage',
  async (userData, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    const headers = {'Content-Type': 'multipart/form-data'};
    try {
      const response = await put(
        apiRoutes.updateProfileImage,
        userData,
        headers,
      );
      // console.log('userData...', userData);
      if (response.status) {
        return rejectWithValue(response.message || 'Failed to update user');
      }
      // console.log('update profile', response);
      return response;
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to update user');
    }
  },
);

// export const onGetProfileImage = createAsyncThunk(
//   'userSlice/getProfileImage',
//   async (_, {rejectWithValue}) => {
//     try {
//       const response = await get(apiRoutes.updateProfileImage, {
//         responseType: 'arraybuffer',
//       });
//       if (response.status) {
//         return rejectWithValue(response.message || 'Failed to update user');
//       }
//       const base64Image = Buffer.from(response, 'binary').toString('base64');
//       const imageURI = `data:image/jpeg;base64,${base64Image}`;

//       if (base64Image.length !== 0) {
//         return imageURI;
//       }
//     } catch (error) {
//       // console.log('error', error);
//       return rejectWithValue('Failed to get user image.');
//     }
//   },
// );

export const onChangePassword = createAsyncThunk(
  'userSlice/changePassword',
  async (
    userData: {
      currentPassword: string;
      newPassword: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue} = thunkAPI;
    try {
      // console.log('user req', userData);
      const response = await put(apiRoutes.changePassword, userData);
      // console.log('user res', response.status, response);
      if (response.status === 401) {
        // console.log('user error', response.error);
        return rejectWithValue(response.message || 'Password change failed');
      }
      return response;
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to fetch user profile');
    }
  },
);

export const onChangeUserPassword = createAsyncThunk(
  'userSlice/changeUserPassword',
  async (
    userData: {
      password: string;
    },
    thunkAPI,
  ) => {
    // console.log('userData', userData);
    const {rejectWithValue, getState} = thunkAPI;
    const {
      user: {workerDetailData},
    } = getState() as {user: _initialState};
    let userDetailDataString = workerDetailData;
    // const fixedJSONString = userDetailDataString
    //   .replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":')
    //   .replace(/'/g, '"')
    //   .replace(/new ObjectId\((.*?)\)/g, '$1');
    // userDetailDataString = JSON.parse(fixedJSONString);
    const id = workerDetailData ? workerDetailData.uuid : "";
    // console.log('user id', typeof workerDetailData);
    try {
      const response = await put(apiRoutes.changeUserPassword(id), userData);
      if (response.status) {
        // console.log('user', response);
        return rejectWithValue(response.message || 'Reset password failed');
      }
      // console.log('user', response);
      return response;
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to fetch user profile');
    }
  },
);

export const onGetCompanyCustomers = createAsyncThunk(
  'userSlice/companyCustomers',
  async (
    userData: {
      page: number;
      search: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
    } = getState() as {auth: any};
    const id = companyMapping.companyInfo.uuid;
    try {
      const queryParams = new URLSearchParams({
        page: userData.page.toString(),
        ...(userData.search.length > 0 && {search: userData.search}),
      }).toString();
      const response = await get(
        `${apiRoutes.companyCustomerList(id)}?${queryParams}`,
      );
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.customers) {
        // console.log('customer response...', response);
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to get users list');
    }
  },
);

export const onGetCustomerHistory = createAsyncThunk(
  'userSlice/getCustomerHistory',
  async (
    userData: {
      phoneNumber: string;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
    } = getState() as {auth: any};
    const comId = companyMapping.companyInfo.uuid;
    try {
      const response = await get(
        `${apiRoutes.customerHistory(comId)}?phoneNumber=${
          userData.phoneNumber
        }`,
      );
      // console.log('history res', response);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.customer) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to get users list');
    }
  },
);

export const onGetCustomerRewards = createAsyncThunk(
  'userSlice/getCustomerRewards',
  async (_, {rejectWithValue, getState}) => {
    const {
      auth: {userData: companyMapping},
      user: {customerHistoryData: customerHistoryData},
    } = getState() as {auth: any; user: any};
    const comId = companyMapping.companyInfo.uuid;
    const customerId = customerHistoryData.customer.uuid;
    try {
      const response = await get(
        `${apiRoutes.customerRewards(comId, customerId)}`,
      );
      // console.log('rewards res', response);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.customer) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to get users list');
    }
  },
);

export const onRedeemRewards = createAsyncThunk(
  'userSlice/redeemRewards',
  async (
    userData: {
      action: string;
      redeemList: {
        reward: string;
        count: number;
      }[];
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
      user: {customerHistoryData: customerHistoryData},
    } = getState() as {auth: any; user: any};
    const comId = companyMapping.companyInfo.uuid;
    const customerId = customerHistoryData.customer.uuid;
    try {
      const response = await post(
        apiRoutes.redeemRewards(comId, customerId),
        userData,
      );
      // console.log('redeem res', response);
      if (response.message) {
        return rejectWithValue(response.message);
      }
      if (response.customer) {
        return response;
      }
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to get users list');
    }
  },
);

export const onGenerateBill = createAsyncThunk(
  'userSlice/generateBill',
  async (
    userData: {
      fullName: string;
      phoneNumber: string;
      // billNumber: string;
      costOfBill: number;
    },
    thunkAPI,
  ) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {
      auth: {userData: companyMapping},
    } = getState() as {auth: any; user: any};
    const comId = companyMapping.companyInfo.uuid;
    try {
      // console.log('bill req', apiRoutes.customerBill(comId), userData);
      const response = await post(apiRoutes.customerBill(comId), userData);
      // console.log('bill res', response);
      if (response.message || response.error) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      // console.log('error', error);
      return rejectWithValue('Failed to get users list');
    }
  },
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    clearUserError: state => {
      state.error = null;
    },
    clearUserMessage: state => {
      state.message = null;
    },
    resetCustomerData: state => {
      state.customerHistoryData = null;
      state.customerRewardsData = null;
    },
  },
  extraReducers(builder) {
    builder.
      addCase('auth/resetAll', () => initialState)
      // .addCase(resetAll, () => initialState)
      .addCase(onAddUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(onAddUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onAddUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onGetCompanyWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.companyWorkerListData = action.payload;
      })
      .addCase(onGetCompanyWorkers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onGetCompanyWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onGetWorkerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.workerDetailData = action.payload;
      })
      .addCase(onGetWorkerDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onGetWorkerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onUpdateWorkerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Worker updated successfully.';
      })
      .addCase(onUpdateWorkerDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onUpdateWorkerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onUpdateProfileDetail.fulfilled, (state, action) => {
        // state.loading = false;
      })
      .addCase(onUpdateProfileDetail.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(onUpdateProfileDetail.rejected, (state, action) => {
        // state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onUpdateProfileImage.fulfilled, (state, action) => {
        // state.loading = false;
      })
      .addCase(onUpdateProfileImage.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(onUpdateProfileImage.rejected, (state, action) => {
        // state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      // .addCase(onGetProfileImage.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.userImage = action.payload;
      // })
      // .addCase(onGetProfileImage.pending, (state, action) => {
      //   state.loading = true;
      // })
      // .addCase(onGetProfileImage.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = (action.payload as string) || 'An unknown error occurred';
      // })
      .addCase(onChangePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(onChangePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onChangePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onChangeUserPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(onChangeUserPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onChangeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onGetCompanyCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.companyCustomerListData = action.payload;
      })
      .addCase(onGetCompanyCustomers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onGetCompanyCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onGetCustomerRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.customerRewardsData = action.payload;
      })
      .addCase(onGetCustomerRewards.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onGetCustomerRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onRedeemRewards.fulfilled, (state, action) => {
        state.loading = false;
        // state.customerRewardsData = action.payload;
      })
      .addCase(onRedeemRewards.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onRedeemRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onGenerateBill.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(onGenerateBill.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onGenerateBill.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      })
      .addCase(onGetCustomerHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.customerHistoryData = action.payload;
      })
      .addCase(onGetCustomerHistory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(onGetCustomerHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An unknown error occurred';
      });
  },
});

export const {clearUserError, clearUserMessage, resetCustomerData} =
  userSlice.actions;

export default userSlice.reducer;
