import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Tooltip } from 'reactstrap';
import { BsPlusSquareFill } from 'react-icons/bs';

import Banner from 'components/Banner';
import ModalYesNoCancel from 'components/Modal/ModalYesNoCancel';
import PhotoList from 'pages/Photo/components/PhotoList';
import useShowOk from 'hooks/modal/useShowOk';
import useShowYesNoCancel from 'hooks/modal/useShowYesNoCancel';
import {
  usePhotoDelete,
  usePhotoGetByUser,
  usePhotoPublic,
} from 'hooks/axios/apiPhotos';
import { useCategoryGetAll } from 'hooks/axios/apiCategories';

import { PATH_PHOTOS, PATH_PHOTOS_ADD, PATH_USER_LOGIN } from 'constants/route';
import {
  NOTIFICATION,
  CONFIRM,
  DELETE_FAILED,
  DELETE_CONFIRM,
  ERROR_GENERAL,
} from 'constants/modal';
import Images from 'constants/images';
import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

const MainPage = (props) => {
  const history = useHistory();

  const [showYesNoCancel] = useShowYesNoCancel();
  const [showOk] = useShowOk();
  const photosState = useSelector((state) => state.photos.data);
  const [photos, setPhotos] = useState(photosState);
  const [photoSelected, setPhotoSelected] = useState(null);
  const [isCalledApi, setIsCalledApi] = useState(false);

  // Get cookie
  const userLogin = useSelector((state) => state.cookies.userLogin);

  // Get category when redux store missing
  const categoriesState = useSelector((state) => state.categories.data);
  const [apiCategoryGetAll] = useCategoryGetAll();
  useEffect(() => {
    const callApi = async () => {
      if (categoriesState.length === 0) {
        // Call API
        await apiCategoryGetAll();
      }
    };
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get photo by user
  const [apiPhotoGetByUser] = usePhotoGetByUser();
  const [apiPhotoPublic] = usePhotoPublic();
  useEffect(() => {
    const callApi = async () => {
      setIsCalledApi(true);
      try {
        if (userLogin) {
          const response = await apiPhotoGetByUser(userLogin?._id);
          if (response?.success) {
            const data = response.photos ? response.photos : [];
            setPhotos(data);
          } else {
            if (response?.message === IS_REFRESH_TOKEN_FAIL) {
              history.push({
                pathname: PATH_USER_LOGIN,
                state: { type: 'Photo_Edit' },
              });
            }
          }
        } else {
          const response = await apiPhotoPublic();
          if (response?.success) {
            const data = response.photos ? response.photos : [];
            setPhotos(data);
          } else {
            if (response?.message === IS_REFRESH_TOKEN_FAIL) {
              history.push({
                pathname: PATH_USER_LOGIN,
                state: { type: 'Photo_Edit' },
              });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (photosState?.length === 0 && !isCalledApi) {
      callApi();
    } else {
      setPhotos(photosState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photosState]);

  // Hander Events
  const handlePhotoEditClick = (photo) => {
    if (userLogin) {
      history.push(PATH_PHOTOS + photo._id);
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Photo_Edit' },
      });
    }
  };

  const handlePhotoRemoveClick = (photo) => {
    if (userLogin) {
      setPhotoSelected(photo);
      showYesNoCancel({ title: CONFIRM, content: DELETE_CONFIRM });
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Photo_Remove' },
      });
    }
  };

  // Modal
  const [apiPhotoDelete] = usePhotoDelete();
  const handleClickYes = async () => {
    try {
      // Call API
      const response = await apiPhotoDelete(photoSelected._id);
      if (!response.success) {
        if (response?.message !== IS_REFRESH_TOKEN_FAIL) {
          const message = response.message ? response.message : DELETE_FAILED;
          showOk({ title: NOTIFICATION, content: message });
        }
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    // Close modal
    showYesNoCancel({ title: '', content: '' });
  };

  const handleClickNo = () => {
    showYesNoCancel({ title: '', content: '' });
  };

  // Render GUI
  const iconStyles = { color: '#0275d8', fontSize: '3.0em' };
  const tooltipStyles = { fontSize: '20px' };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const pathAdd = userLogin ? PATH_PHOTOS_ADD : PATH_USER_LOGIN;

  return (
    <Fragment>
      <div className='photo-main'>
        <Banner title='My photos 🎉' backgroundUrl={Images.BLUE_BG} />

        <Container className='text-center'>
          <div className='py-5 text-right'>
            <Link
              to={{
                pathname: pathAdd,
                state: { type: 'Photo_Add' },
              }}
              id='AddNewPhoto'>
              <BsPlusSquareFill style={iconStyles} />
            </Link>
            <Tooltip
              placement='left'
              isOpen={tooltipOpen}
              target='AddNewPhoto'
              toggle={toggle}
              style={tooltipStyles}>
              Add new photo
            </Tooltip>
          </div>

          {photos.length !== 0 ? (
            <PhotoList
              photoList={photos}
              onPhotoEditClick={handlePhotoEditClick}
              onPhotoRemoveClick={handlePhotoRemoveClick}
            />
          ) : (
            <h3>No data. Please add new photo</h3>
          )}
        </Container>
      </div>
      <ModalYesNoCancel
        onClickYes={handleClickYes}
        onClickNo={handleClickNo}></ModalYesNoCancel>
    </Fragment>
  );
};

MainPage.propTypes = {};

export default MainPage;
