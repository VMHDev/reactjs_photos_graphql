import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import InputField from 'components/InputField';
import SelectField from 'components/SelectField';
import CheckboxField from 'components/CheckboxField';
import RandomPhotoField from 'components/RandomPhotoField';
import * as Yup from 'yup';

const LoadDataCategories = () => {
  const categories = useSelector((state) => state.categories.data);
  let categoriesOption = [];
  for (let item of categories) {
    const itemOptions = {
      value: item._id,
      label: item.name,
    };
    categoriesOption.push(itemOptions);
  }
  return categoriesOption;
};

const PhotoForm = (props) => {
  const { initialValues, isAddMode, onSubmit } = props;
  const categoriesOption = LoadDataCategories();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required.'),
    desc: Yup.string(),
    categoryId: Yup.string().required('This field is required.').nullable(),
    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required.'),
      otherwise: Yup.string().notRequired(),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => {
        return (
          <Form>
            <FastField
              name='title'
              component={InputField}
              label='Title'
              placeholder='Eg: Wow nature ...'
            />

            <FastField
              name='desc'
              component={InputField}
              label='Description'
              placeholder='Eg: This is ...'
              type='textarea'
              style={{ marginTop: '0px', marginBottom: '0px', height: '120px' }}
            />

            <FastField
              name='categoryId'
              component={SelectField}
              label='Category'
              placeholder="What's your photo category?"
              options={categoriesOption}
            />

            <FastField name='path' component={RandomPhotoField} label='Photo' />

            <FastField
              name='is_public'
              component={CheckboxField}
              label='Public'
            />

            <FormGroup>
              <Button type='submit' color={isAddMode ? 'primary' : 'success'}>
                {isAddMode ? 'Add' : 'Update'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

PhotoForm.propTypes = {
  initialValues: PropTypes.object,
  isAddMode: PropTypes.bool,
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  initialValues: {},
  isAddMode: true,
  onSubmit: null,
};

export default PhotoForm;
