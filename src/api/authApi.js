import axiosClient from './axiosClient';
const authApi = {
  login: (data) => {
    console.log('Calling api Auth login...');
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  refreshToken: (data) => {
    console.log('Calling api Auth refresh token...');
    const url = '/auth/token-refresh';
    return axiosClient.post(url, data);
  },
  logout: (data) => {
    console.log('Calling api Auth logout...');
    const url = '/auth/logout';
    return axiosClient.post(url, data);
  },
  changePassword: (data) => {
    console.log('Calling api Auth change password...');
    const url = `/auth/password/${data._id}`;
    return axiosClient.put(url, data);
  },
  getTokenPassword: (data) => {
    console.log('Calling api Auth get token password...');
    const url = `/auth/token-password/${data}`;
    return axiosClient.get(url);
  },
  addTokenPassword: (data) => {
    console.log('Calling api Auth add token password...');
    const url = '/auth/token-password';
    return axiosClient.post(url, data);
  },
};
export default authApi;
