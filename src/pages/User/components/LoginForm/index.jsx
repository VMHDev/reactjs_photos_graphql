import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Row, Col } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import InputField from 'components/InputField';

// Constants
import { PATH_USER_REGISTER, PATH_USER_FORGOTPASSWORD } from 'constants/route';

// Main
const LoginForm = (props) => {
  const { initialValues, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('This field is required.')
      .email('This field is invalid email'),

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
          <Fragment>
            <Form>
              <FastField
                name='email'
                component={InputField}
                label='Email'
                placeholder='your-email@mail.com'
              />

              <FastField
                name='password'
                component={InputField}
                label='Password'
                placeholder='********'
                type='password'
              />

              <FormGroup>
                <Row xs='2'>
                  <Col>
                    <Button type='submit' color='primary'>
                      Login
                    </Button>
                  </Col>
                  <Col className='align-self-center'>
                    <NavLink
                      to={PATH_USER_FORGOTPASSWORD}
                      activeClassName='selected'
                      className='float-right'>
                      Fogot Password
                    </NavLink>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
            <NavLink to={PATH_USER_REGISTER} activeClassName='selected'>
              Create new account
            </NavLink>
          </Fragment>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
};

export default LoginForm;
