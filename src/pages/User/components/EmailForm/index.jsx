import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';

import InputField from 'components/InputField';

const ForgotPasswordForm = (props) => {
  const { initialValues, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('This field is required.')
      .email('This field is invalid email'),
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
              name='email'
              component={InputField}
              label='Please enter your email'
              placeholder='your-email@mail.com'
            />

            <FormGroup>
              <Button type='submit' color='primary'>
                Submit
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

ForgotPasswordForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

ForgotPasswordForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
};

export default ForgotPasswordForm;
