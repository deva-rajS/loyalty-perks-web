import { baseURL } from './networks';

const appendBaseUrl = (subUrl: string) => {
  return `${baseURL}${subUrl}`;
};

export const apiRoutes = {
  refreshToken: appendBaseUrl('auth/token'),
  signIn: appendBaseUrl('auth/company/login'),
  signUp: appendBaseUrl('auth/company/signup'),
  passwordReset: appendBaseUrl('auth/company/forgot-password'),
  getProfile: appendBaseUrl('auth/user-info'),
  changePassword: appendBaseUrl('user/password'),
  changeUserPassword: (id: string) =>
    appendBaseUrl(`user/company/password/${id}`),
  homeDashboard: appendBaseUrl('homeDashboard'),
  createDepartment: appendBaseUrl('department'),
  editDepartment: appendBaseUrl('department'),
  allDepartmentList: appendBaseUrl('department/list'),
  departmentList: appendBaseUrl('department'),
  password: appendBaseUrl('password'),
  worker: (id: string) => appendBaseUrl(`company/${id}/worker`),
  companyWorkerList: (id: string) => appendBaseUrl(`company/${id}/users`),
  companyCustomerList: (id: string) => appendBaseUrl(`company/${id}/customers`),
  updateProfile: (comId: string, userId: string) =>
    appendBaseUrl(`company/${comId}/users/${userId}`),
  updateProfileImage: appendBaseUrl(`user/profile/avatar`),
  profileImage: appendBaseUrl(`user/profile/avatar`),
  workerDetail: (comId: string, id: string) =>
    appendBaseUrl(`company/${comId}/users/${id}`),
  updateWorker: (comId: string, id: string) =>
    appendBaseUrl(`company/${comId}/users/${id}`),
  customerHistory: (comId: string) =>
    appendBaseUrl(`company/${comId}/customers/reward-points/history`),
  customerRewards: (comId: string, id: string) =>
    appendBaseUrl(`company/${comId}/customers/${id}/reward-eligibility`),
  redeemRewards: (comId: string, id: string) =>
    appendBaseUrl(`company/${comId}/customers/${id}/action-points`),
  customerBill: (comId: string) =>
    appendBaseUrl(`company/${comId}/customer-bill`),
};
