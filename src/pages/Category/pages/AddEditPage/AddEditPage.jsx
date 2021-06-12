import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Banner from 'components/Banner';
import CategoryForm from 'pages/Category/components/CategoryForm';

import { showLoading } from 'redux/appSlice';
import { useCategoryAdd, useCategoryUpdate } from 'hooks/axios/apiCategories';
import useShowOk from 'hooks/modal/useShowOk';

// Constants
import { PATH_CATEGORIES } from 'constants/route';
import { NOTIFICATION, UPDATE_FAILED, ERROR_GENERAL } from 'constants/modal';
import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

// Styles
import './styles.scss';

const AddEditPage = (props) => {
  const [showOk] = useShowOk();
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryId } = useParams();

  const isAddMode = categoryId === 'add' || !categoryId ? true : false;

  const editedCategory = useSelector((state) => {
    const foundCategory = state.categories.data.find(
      (x) => x._id.toString() === categoryId
    );
    return foundCategory;
  });

  const initialValues = isAddMode
    ? {
        _id: 'Auto generate',
        name: '',
      }
    : editedCategory;

  // Redirect when missing state
  useEffect(() => {
    if (!editedCategory && !isAddMode) {
      history.push(PATH_CATEGORIES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedCategory]);

  // Handle events
  const [apiCategoryAdd] = useCategoryAdd();
  const [apiCategoryUpdate] = useCategoryUpdate();

  const handleSubmit = async (values) => {
    dispatch(showLoading(true));
    let response = null;
    try {
      if (isAddMode) {
        response = await apiCategoryAdd(values);
      } else {
        response = await apiCategoryUpdate(values);
      }
    } catch (error) {
      showOk({ title: NOTIFICATION, content: ERROR_GENERAL });
      dispatch(showLoading(false));
      console.log(error);
    }

    // Handle response
    if (response?.success) {
      history.push(PATH_CATEGORIES);
    } else {
      if (response?.message !== IS_REFRESH_TOKEN_FAIL) {
        const message = response.message ? response.message : UPDATE_FAILED;
        showOk({ title: NOTIFICATION, content: message });
      }
    }
    dispatch(showLoading(false));
  };

  return (
    <div className='category-edit'>
      <Banner
        title={isAddMode ? 'Add new category 🛍️' : 'Update category 🛍️'}
      />

      <div className='category-edit__form'>
        <CategoryForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

AddEditPage.propTypes = {};

export default AddEditPage;
