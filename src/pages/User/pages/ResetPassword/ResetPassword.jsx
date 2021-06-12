import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import moment from 'moment';
import momenttimezone from 'moment-timezone';

import { useGetById, useUserUpdate } from 'hooks/axios/apiUsers';
import { useGetTokenPassword } from 'hooks/axios/apiAuths';
import { showLoading } from 'redux/appSlice';

import ConfirmPasswordForm from 'pages/User/components/ConfirmPasswordForm';
import Banner from 'components/Banner';
import NotFound from 'components/NotFound';
import useShowOk from 'hooks/modal/useShowOk';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';
import { PASSWORD_RESET_TOKEN_EXPIRE, TIME_ZONE } from 'constants/system';
import { NOTIFICATION, PROCESS_FAILED, ERROR_GENERAL } from 'constants/modal';
import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

// Styles
import './styles.scss';

const ResetPassword = (props) => {
  const [showOk] = useShowOk();
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();

  const [isTokenValid, setIsTokenValid] = useState(0);
  const [user, setUser] = useState({});

  const [apiGetById] = useGetById();
  const [apiGetTokenPassword] = useGetTokenPassword();
  useEffect(() => {
    const checkToken = async () => {
      dispatch(showLoading(true));
      // Check token valid
      const responseToken = await apiGetTokenPassword(token);
      if (!responseToken.success) {
        setIsTokenValid(-1);
        return;
      }
      const tokenFound = responseToken.token_info;
      if (tokenFound) {
        // Get info user
        const responseUser = await apiGetById(tokenFound.user_id);
        if (!responseUser.success) {
          setIsTokenValid(-1);
          return;
        }
        const userFound = responseUser.user;
        setUser(userFound);

        // Check token expire
        let dateRegister = moment(tokenFound.registered_date).add(
          PASSWORD_RESET_TOKEN_EXPIRE,
          'm'
        );
        dateRegister = momenttimezone.tz(dateRegister, TIME_ZONE).toDate();
        const dataNow = momenttimezone.tz(Date.now(), TIME_ZONE).toDate();
        if (dateRegister < dataNow) {
          setIsTokenValid(-1);
        } else {
          setIsTokenValid(1);
        }
      } else {
        setIsTokenValid(-1);
      }
      dispatch(showLoading(false));
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    email: props.location.state.email,
    password: '',
    confirmPassword: '',
  };

  // Handle events
  const [apiUserUpdate] = useUserUpdate();
  const handleSubmit = async (values) => {
    try {
      let objUser = { ...user, ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);
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
  };

  return isTokenValid === 1 ? (
    <div className='reset-password'>
      <Banner title='Reset Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='reset-password__form'>
        <ConfirmPasswordForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  ) : isTokenValid === -1 ? (
    <NotFound />
  ) : (
    <></>
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
