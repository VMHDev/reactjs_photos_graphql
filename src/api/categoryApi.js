import axiosClient from './axiosClient';
const categoryApi = {
  getAll: () => {
    console.log('Calling api Category get all...');
    const url = '/category';
    return axiosClient.get(url);
  },
  add: (data) => {
    console.log('Calling api Category add...');
    const url = '/category';
    return axiosClient.post(url, data);
  },
  update: (data) => {
    console.log('Calling api Category update...');
    const url = `/category/${data._id}`;
    return axiosClient.put(url, data);
  },
  delete: (data) => {
    console.log('Calling api Category delete...');
    const url = `/category/${data}`;
    return axiosClient.delete(url);
  },
};
export default categoryApi;
