import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import InputField from 'components/InputField';
import * as Yup from 'yup';

const CategoryForm = (props) => {
  const { initialValues, isAddMode, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required.'),
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
              name='_id'
              component={InputField}
              label='Category ID'
              placeholder=''
              disabled
            />

            <FastField
              name='name'
              component={InputField}
              label='Category Name'
              placeholder=''
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

CategoryForm.propTypes = {
  initialValues: PropTypes.object,
  isAddMode: PropTypes.bool,
  onSubmit: PropTypes.func,
};

CategoryForm.defaultProps = {
  initialValues: {},
  isAddMode: true,
  onSubmit: null,
};

export default CategoryForm;
