import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { useRegister } from 'hooks/axios/apiUsers';
import { showLoading } from 'redux/appSlice';
import RegisterForm from 'pages/User/components/RegisterForm';
import Banner from 'components/Banner';
import useShowOk from 'hooks/modal/useShowOk';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';
import {
  NOTIFICATION,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  ERROR_GENERAL,
} from 'constants/modal';

// Styles
import './styles.scss';

const Register = (props) => {
  const [showOk] = useShowOk();
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiRegister] = useRegister();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle events
  const handleSubmit = async (values) => {
    let isSuccess = false;
    let messageSuccess = '';
    let messageFailed = '';
    dispatch(showLoading(true));
    try {
      let objUser = { ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);

      // Call API
      const response = await apiRegister({
        name: objUser.name,
        email: objUser.email,
        password: objUser.password,
      });

      // Update state
      messageSuccess = response.message ? response.message : REGISTER_SUCCESS;
      messageFailed = response.message ? response.message : REGISTER_FAILED;
      if (response.success) {
        isSuccess = true;
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    dispatch(showLoading(false));

    if (isSuccess) {
      showOk({ title: NOTIFICATION, content: messageSuccess });
      history.push(PATH_USER_LOGIN);
    } else {
      showOk({ title: NOTIFICATION, content: messageFailed });
    }
  };

  return (
    <div className='register'>
      <Banner title='Register 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='register__form'>
        <RegisterForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          typePage='register'
        />
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
