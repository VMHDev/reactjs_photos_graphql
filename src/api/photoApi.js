import axiosClient from './axiosClient';
const photoApi = {
  getAll: () => {
    console.log('Calling api Photo get all...');
    const url = '/photo';
    return axiosClient.get(url);
  },
  getPublic: () => {
    console.log('Calling api Photo get public...');
    const url = '/photo/public';
    return axiosClient.get(url);
  },
  getByUser: () => {
    console.log('Calling api Photo get by user...');
    const url = '/photo/user';
    return axiosClient.get(url);
  },
  add: (data) => {
    console.log('Calling api Photo add...');
    const url = '/photo';
    return axiosClient.post(url, data);
  },
  update: (data) => {
    console.log('Calling api Photo update...');
    const url = `/photo/${data._id}`;
    return axiosClient.put(url, data);
  },
  delete: (data) => {
    console.log('Calling api Photo delete...');
    const url = `/photo/${data}`;
    return axiosClient.delete(url);
  },
};
export default photoApi;
