import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';

import InputField from 'components/InputField';

const PasswordForm = (props) => {
  const { initialValues, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('This field is required.')
      .min(6, 'Min length 6 character')
      .max(20, 'Max length 20 character'),
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
              name='password'
              component={InputField}
              label='Enter password current'
              placeholder='********'
              type='password'
            />

            <FormGroup>
              <Button type='submit' color='primary'>
                Next
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

PasswordForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

PasswordForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
};

export default PasswordForm;
