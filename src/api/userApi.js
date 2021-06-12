import axiosClient from './axiosClient';
const userApi = {
  getExceptUserId: (data) => {
    console.log('Calling api User get except user id...');
    const url = `/user`;
    return axiosClient.post(url, data);
  },
  getById: (params) => {
    console.log('Calling api User get by id...');
    const url = `/user/${params}`;
    return axiosClient.get(url);
  },
  getByEmail: (data) => {
    console.log('Calling api User get by email...');
    const url = '/user/email';
    return axiosClient.post(url, data);
  },
  register: (data) => {
    console.log('Calling api User register...');
    const url = '/user/register';
    return axiosClient.post(url, data);
  },
  update: (data) => {
    console.log('Calling api User update...');
    const url = `/user/${data._id}`;
    return axiosClient.put(url, data);
  },
  setPermission: (data) => {
    console.log('Calling api User set permission...');
    const url = `/user/set-permission/${data.userId}`;
    return axiosClient.put(url, data);
  },
};
export default userApi;
