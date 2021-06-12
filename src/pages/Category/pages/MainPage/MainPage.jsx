import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Tooltip } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { BsPlusSquareFill } from 'react-icons/bs';

import Banner from 'components/Banner';
import ModalYesNoCancel from 'components/Modal/ModalYesNoCancel';
import CategoryTable from 'pages/Category/components/CategoryTable';
import {
  useCategoryGetAll,
  useCategoryDelete,
} from 'hooks/axios/apiCategories';
import useShowYesNoCancel from 'hooks/modal/useShowYesNoCancel';
import useShowOk from 'hooks/modal/useShowOk';

import {
  PATH_CATEGORIES,
  PATH_USER_LOGIN,
  PATH_CATEGORIES_ADD,
} from 'constants/route';
import {
  NOTIFICATION,
  CONFIRM,
  DELETE_FAILED,
  DELETE_CONFIRM,
  ERROR_GENERAL,
  DONT_PERMISSION,
} from 'constants/modal';
import Images from 'constants/images';
import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

const MainPage = (props) => {
  const history = useHistory();

  const [showYesNoCancel] = useShowYesNoCancel();
  const [showOk] = useShowOk();
  const categoriesState = useSelector((state) => state.categories.data);
  const [categories, setCategories] = useState(categoriesState);
  const [categorySelected, setCategorySelected] = useState(null);
  const [isCalledApi, setIsCalledApi] = useState(false);

  // Get cookie
  const userLogin = useSelector((state) => state.cookies.userLogin);

  // Get all category
  const [apiCategoryGetAll] = useCategoryGetAll();
  useEffect(() => {
    const callApi = async () => {
      setIsCalledApi(true);
      // Call API
      const response = await apiCategoryGetAll();
      if (response?.success) {
        const data = response.categories ? response.categories : [];
        setCategories(data);
      }
    };
    if (categoriesState?.length === 0 && !isCalledApi) {
      callApi();
    } else {
      setCategories(categoriesState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesState]);

  // Hander Events
  const handleCategoryEditClick = (category) => {
    if (userLogin) {
      if (userLogin.permission !== 0) {
        history.push(PATH_CATEGORIES + category._id);
      } else {
        showOk({ title: NOTIFICATION, content: DONT_PERMISSION });
      }
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Category_Edit' },
      });
    }
  };

  const handleCategoryRemoveClick = (category) => {
    if (userLogin) {
      if (userLogin.permission !== 0) {
        setCategorySelected(category);
        showYesNoCancel({
          title: CONFIRM,
          content: DELETE_CONFIRM,
        });
      } else {
        showOk({ title: NOTIFICATION, content: DONT_PERMISSION });
      }
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Category_Remove' },
      });
    }
  };

  // Modal
  const [apiCategoryDelete] = useCategoryDelete();
  const handleClickYes = async () => {
    try {
      // Call API
      const response = await apiCategoryDelete(categorySelected._id);
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

  const pathAdd = userLogin ? PATH_CATEGORIES_ADD : PATH_USER_LOGIN;

  return (
    <Fragment>
      <div className='photo-main text-right'>
        <Banner title='List category 🎉' backgroundUrl={Images.PINK_BG} />

        <Container>
          <div className='py-5'>
            <Link
              to={{
                pathname: pathAdd,
                state: { type: 'Category_Add' },
              }}
              id='AddNewCategory'>
              <BsPlusSquareFill style={iconStyles} />
            </Link>
            <Tooltip
              placement='left'
              isOpen={tooltipOpen}
              target='AddNewCategory'
              toggle={toggle}
              style={tooltipStyles}>
              Add new photo
            </Tooltip>
          </div>

          <CategoryTable
            categoryList={categories}
            onCategoryEditClick={handleCategoryEditClick}
            onCategoryRemoveClick={handleCategoryRemoveClick}
          />
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
