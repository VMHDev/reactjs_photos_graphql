import { useDispatch } from 'react-redux';
import { showModalYesNoCancel } from 'redux/appSlice';

const useShowYesNoCancel = () => {
  const dispatch = useDispatch();
  const callback = (params) => {
    const { title, content } = params;
    dispatch(
      showModalYesNoCancel({
        title,
        content,
      })
    );
  };
  return [callback];
};

export default useShowYesNoCancel;
