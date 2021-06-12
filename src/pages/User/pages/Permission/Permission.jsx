import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import Banner from 'components/Banner';
import PermissionTable from 'pages/User/components/PermissionTable';
import {
  useUsesGetExceptUserId,
  useUserSetPermission,
} from 'hooks/axios/apiUsers';
import useShowOk from 'hooks/modal/useShowOk';
import { showLoading } from 'redux/appSlice';

import { NOTIFICATION, UPDATE_SUCCESS, ERROR_GENERAL } from 'constants/modal';
import Images from 'constants/images';

const Permission = (props) => {
  const dispatch = useDispatch();

  const [showOk] = useShowOk();
  const [users, setUsers] = useState([]);

  // Get cookie
  const userLogin = useSelector((state) => state.cookies.userLogin);

  // Get all user except user login
  const [apiUsesGetExceptUserId] = useUsesGetExceptUserId();
  const callApiUsesGetExceptUserId = async () => {
    dispatch(showLoading(true));
    // Call API
    const response = await apiUsesGetExceptUserId({ userId: userLogin._id });
    if (response?.success) {
      const data = response.users ? response.users : [];
      data.forEach((user) => {
        user.isAdmin = user.permission !== 0 ? true : false;
      });
      setUsers(data);
    }
    dispatch(showLoading(false));
  };

  useEffect(() => {
    callApiUsesGetExceptUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hander Events
  const [apiUserSetPermission] = useUserSetPermission();
  const handleUserSetAdminClick = async (isAdmin, user) => {
    try {
      dispatch(showLoading(true));
      // Call API
      const response = await apiUserSetPermission({
        userId: user._id,
        isAdmin,
      });
      if (response?.success) {
        showOk({ title: NOTIFICATION, content: UPDATE_SUCCESS });
        callApiUsesGetExceptUserId();
      } else {
        const message = response?.message ? response?.message : ERROR_GENERAL;
        showOk({ title: NOTIFICATION, content: message });
      }
      dispatch(showLoading(false));
    } catch (error) {
      console.log(error);
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
    }
  };

  // Render GUI
  return (
    <Fragment>
      <div className='photo-main text-right'>
        <Banner title='List user 🎉' backgroundUrl={Images.FOREST3_BG} />

        <Container>
          <div className='py-5'></div>
          <PermissionTable
            userList={users}
            onUserSetAdminClick={handleUserSetAdminClick}
          />
        </Container>
      </div>
    </Fragment>
  );
};

Permission.propTypes = {};

export default Permission;
