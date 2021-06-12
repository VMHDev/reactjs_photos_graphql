import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cryptoRandomString from 'crypto-random-string';

import { useGetByEmail } from 'hooks/axios/apiUsers';
import { useAddTokenPassword } from 'hooks/axios/apiAuths';
import EmailForm from 'pages/User/components/EmailForm';
import Banner from 'components/Banner';
import { showLoading } from 'redux/appSlice';
import useShowOk from 'hooks/modal/useShowOk';

// Constants
import Images from 'constants/images';
import { PASSWORD_RESET_TOKEN_LENGTH, WEB_URL } from 'constants/system';
import { PATH_USER_RESETPASSWORD } from 'constants/route';
import { NOTIFICATION, PROCESS_FAILED, ERROR_GENERAL } from 'constants/modal';

// Styles
import './styles.scss';

const ForgotPassword = (props) => {
  const [showOk] = useShowOk();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
  };

  const [email, setEmail] = useState('');
  const [fogotPassword, setFogotPassword] = useState(0);
  const [token, setToken] = useState('');
  useEffect(() => {}, [token]);

  const generateToken = (userId) => {
    const randomString = cryptoRandomString({
      length: PASSWORD_RESET_TOKEN_LENGTH,
      type: 'alphanumeric',
    });
    const sToken = userId + '-' + randomString;
    setToken(sToken);
    return sToken;
  };

  // Handle events
  const [apiGetByEmail] = useGetByEmail();
  const [apiAddTokenPassword] = useAddTokenPassword();
  const handleSubmit = async (values) => {
    dispatch(showLoading(true));
    try {
      setEmail(values.email);
      const response = await apiGetByEmail(values.email);
      if (!response.success) {
        return;
      }
      const userFound = response.user;
      if (userFound) {
        const sToken = generateToken(userFound._id);
        const objToken = {
          user_id: userFound._id,
          token: sToken,
        };
        const response = await apiAddTokenPassword(objToken);
        const message = response.message ? response.message : PROCESS_FAILED;
        if (response.success) {
          setFogotPassword(1);
        } else {
          showOk({ title: NOTIFICATION, content: message });
        }
      } else {
        setFogotPassword(2);
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    dispatch(showLoading(false));
  };

  const pathResetPassword = PATH_USER_RESETPASSWORD + token;

  return (
    <div className='forgot-password'>
      <Banner title='Forgot Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='forgot-password__form'>
        <EmailForm initialValues={initialValues} onSubmit={handleSubmit} />
        {fogotPassword === 1 ? (
          <>
            <span>Step next click link: </span>
            <NavLink to={{ pathname: pathResetPassword, state: { email } }}>
              {WEB_URL + PATH_USER_RESETPASSWORD + token}
            </NavLink>
          </>
        ) : fogotPassword === 2 ? (
          <div className='forgot-password__message'>Email not exist </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
