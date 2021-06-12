import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { useLogin, useLogout } from 'hooks/axios/apiAuths';
import { showLoading } from 'redux/appSlice';
import LoginForm from 'pages/User/components/LoginForm';
import Banner from 'components/Banner';
import useShowOk from 'hooks/modal/useShowOk';

// Constants
import Images from 'constants/images';
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_PHOTOS_ADD,
  PATH_CATEGORIES_ADD,
} from 'constants/route';
import {
  NOTIFICATION,
  LOGIN_FAILED,
  ERROR_GENERAL,
  LOGOUT_FAILED,
  PLEASE_LOGIN,
} from 'constants/modal';
import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

// Styles
import './styles.scss';

// Main
const LoginPage = (props) => {
  const [showOk] = useShowOk();
  const userLogin = useSelector((state) => state.cookies.userLogin);
  const isPleaseLogin = useSelector((state) => state.app.isPleaseLogin);

  const dispatch = useDispatch();
  const history = useHistory();
  const [apiLogin] = useLogin();
  const [apiLogout] = useLogout();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await apiLogout({ userId: userLogin._id });
        if (!response?.success && response?.message !== IS_REFRESH_TOKEN_FAIL) {
          showOk({ title: NOTIFICATION, content: LOGOUT_FAILED });
        }
      } catch (error) {
        showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
        console.log(error);
      }
    };

    // Logout when logined
    if (userLogin) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPleaseLogin) {
      showOk({ title: NOTIFICATION, content: PLEASE_LOGIN });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPleaseLogin]);

  // Handle events
  const handleSubmitLogin = async (values) => {
    let isSuccess = false;
    let message = '';
    dispatch(showLoading(true));
    try {
      // Call API
      const response = await apiLogin({
        email: values.email,
        password: Base64.encode(values.password),
      });

      message = response.message ? response.message : LOGIN_FAILED;
      if (response.success) {
        isSuccess = true;
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    dispatch(showLoading(false));

    // Handle result
    if (isSuccess) {
      // Redirect pages
      const type = props.location.state?.type;
      switch (type) {
        case 'Photo_Remove':
        case 'Photo_Edit':
          history.push(PATH_PHOTOS);
          break;
        case 'Photo_Add':
          history.push(PATH_PHOTOS_ADD);
          break;
        case 'Category_Remove':
        case 'Category_Edit':
          history.push(PATH_CATEGORIES);
          break;
        case 'Category_Add':
          history.push(PATH_CATEGORIES_ADD);
          break;
        default:
          history.push(PATH_HOME);
          break;
      }
    } else {
      showOk({ title: NOTIFICATION, content: message });
    }
  };

  return (
    <Fragment>
      <div className='login'>
        <Banner title='Login 🎉' backgroundUrl={Images.BRIDGE_BG} />
        <div className='login__form'>
          <LoginForm
            initialValues={initialValues}
            onSubmit={handleSubmitLogin}
          />
        </div>
      </div>
    </Fragment>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
