import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading } from 'redux/appSlice';
import { useHistory, useParams } from 'react-router-dom';

import Banner from 'components/Banner';
import PhotoForm from 'pages/Photo/components/PhotoForm';
import { usePhotoAdd, usePhotoUpdate } from 'hooks/axios/apiPhotos';
import useShowOk from 'hooks/modal/useShowOk';

// Constants
import { PATH_PHOTOS } from 'constants/route';
import { NOTIFICATION, ERROR_GENERAL, UPDATE_FAILED } from 'constants/modal';
import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

// Styles
import './styles.scss';

const AddEditPage = (props) => {
  const [showOk] = useShowOk();
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();

  const isAddMode = photoId === 'add' || !photoId ? true : false;

  const editedPhoto = useSelector((state) => {
    let foundPhoto = state.photos.data.find(
      (x) => x._id.toString() === photoId
    );

    foundPhoto = foundPhoto
      ? {
          ...foundPhoto,
          categoryId: foundPhoto.category._id,
          userId: foundPhoto.user._id,
          is_public: foundPhoto.is_public ? foundPhoto.is_public : false,
        }
      : foundPhoto;
    return foundPhoto;
  });

  // Get cookie
  const userLogin = useSelector((state) => state.cookies.userLogin);

  const initialValues = isAddMode
    ? {
        id: 'Auto generate',
        categoryId: '',
        path: '',
        title: '',
        desc: '',
        userId: '',
        is_public: false,
      }
    : editedPhoto;

  // Redirect when missing state
  useEffect(() => {
    if (!editedPhoto && !isAddMode) {
      history.push(PATH_PHOTOS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedPhoto]);

  // Handle events
  const [apiPhotoAdd] = usePhotoAdd();
  const [apiPhotoUpdate] = usePhotoUpdate();

  const handleSubmit = async (values) => {
    dispatch(showLoading(true));
    let response = null;
    try {
      const data = { ...values, userId: userLogin._id };
      if (isAddMode) {
        response = await apiPhotoAdd(data);
      } else {
        response = await apiPhotoUpdate(data);
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      console.log(error);
    }
    // Handle response
    if (response?.success) {
      history.push(PATH_PHOTOS);
    } else {
      if (response?.message !== IS_REFRESH_TOKEN_FAIL) {
        const message = response.message ? response.message : UPDATE_FAILED;
        showOk({ title: NOTIFICATION, content: message });
      }
    }
    dispatch(showLoading(false));
  };

  // Render GUI
  return (
    <Fragment>
      <div className='photo-edit'>
        <Banner title={isAddMode ? 'Add new photo 📷' : 'Update photo 📷'} />

        <div className='photo-edit__form'>
          <PhotoForm
            isAddMode={isAddMode}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </Fragment>
  );
};

AddEditPage.propTypes = {};

export default AddEditPage;
