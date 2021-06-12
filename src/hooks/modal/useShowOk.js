import { useDispatch } from 'react-redux';
import { showModalOk } from 'redux/appSlice';

const useShowOk = () => {
  const dispatch = useDispatch();
  const callback = (params) => {
    const { title, content } = params;
    dispatch(
      showModalOk({
        title,
        content,
      })
    );
  };
  return [callback];
};

export default useShowOk;
