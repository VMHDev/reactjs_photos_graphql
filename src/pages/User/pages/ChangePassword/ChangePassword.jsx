import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { useSelector, useDispatch } from 'react-redux';

import { useLogin } from 'hooks/axios/apiAuths';
import { useChangePassword } from 'hooks/axios/apiAuths';
import { showLoading } from 'redux/appSlice';

import ConfirmPasswordForm from 'pages/User/components/ConfirmPasswordForm';
import PasswordForm from 'pages/User/components/PasswordForm';
import Banner from 'components/Banner';
import useShowOk from 'hooks/modal/useShowOk';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';
import {
  NOTIFICATION,
  PROCESS_FAILED,
  ERROR_GENERAL,
  PASSWORD_INVALID,
} from 'constants/modal';

// Styles
import './styles.scss';

const ChangePassword = (props) => {
  const [showOk] = useShowOk();
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [isValidCurrentPassword, setIsValidCurrentPassword] = useState(false);

  const initPasswordConfirm = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const initPassword = {
    password: '',
  };

  // Get info user
  const userLogin = useSelector((state) => state.cookies.userLogin);

  // Handle events
  const [apiLogin] = useLogin();
  const handleSubmitStep1 = async (values) => {
    dispatch(showLoading(true));
    try {
      const response = await apiLogin({
        email: userLogin.email,
        password: Base64.encode(values.password),
      });
      if (response.success) {
        setIsValidCurrentPassword(true);
        setUser(response.user);
      } else {
        showOk({ title: NOTIFICATION, content: PASSWORD_INVALID });
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    dispatch(showLoading(false));
  };

  const [apiChangePassword] = useChangePassword();
  const handleSubmitStep2 = async (values) => {
    dispatch(showLoading(true));
    try {
      delete values.email;
      let objUser = { ...user, ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);

      const response = await apiChangePassword(objUser);
      const message = response.message ? response.message : PROCESS_FAILED;
      if (response.success) {
        history.push(PATH_USER_LOGIN);
      } else {
        showOk({ title: NOTIFICATION, content: message });
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    dispatch(showLoading(false));
  };

  return (
    <div className='change-password'>
      <Banner title='Change Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='change-password__form'>
        {isValidCurrentPassword ? (
          <ConfirmPasswordForm
            initialValues={initPasswordConfirm}
            onSubmit={handleSubmitStep2}
            typePage='change-password'
          />
        ) : (
          <PasswordForm
            initialValues={initPassword}
            onSubmit={handleSubmitStep1}
          />
        )}
      </div>
    </div>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
