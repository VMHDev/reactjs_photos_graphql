import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import RegisterForm from 'pages/User/components/RegisterForm';
import Banner from 'components/Banner';
import useShowOk from 'hooks/modal/useShowOk';
import { showLoading } from 'redux/appSlice';
import { useUserUpdate } from 'hooks/axios/apiUsers';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';
import { NOTIFICATION, ERROR_GENERAL, PROCESS_FAILED } from 'constants/modal';
import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

// Styles
import './styles.scss';

const Account = (props) => {
  const [showOk] = useShowOk();
  const history = useHistory();
  const dispatch = useDispatch();

  // Get info user
  const userLogin = useSelector((state) => state.cookies.userLogin);

  // Check login
  useEffect(() => {
    if (!userLogin) {
      history.push(PATH_USER_LOGIN);
    }
  }, [userLogin, history]);

  const initialValues = {
    _id: userLogin._id,
    name: userLogin.name,
    email: userLogin.email,
  };

  // Handle events
  const [apiUserUpdate] = useUserUpdate();
  const handleSubmit = async (values) => {
    dispatch(showLoading(true));
    try {
      let objUser = { ...values };

      const response = await apiUserUpdate(objUser);

      if (response.success) {
        history.push(PATH_USER_LOGIN);
      } else {
        const message = response.message ? response.message : PROCESS_FAILED;
        if (response?.message !== IS_REFRESH_TOKEN_FAIL) {
          showOk({ title: NOTIFICATION, content: message });
        }
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    dispatch(showLoading(false));
  };

  return (
    <div className='account'>
      <Banner title='Account 🔥' backgroundUrl={Images.rainBackground} />
      <div className='account__form'>
        <RegisterForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          typePage='account'
        />
      </div>
    </div>
  );
};

Account.propTypes = {};

export default Account;
