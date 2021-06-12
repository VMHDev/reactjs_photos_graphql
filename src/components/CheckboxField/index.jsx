import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

const InputField = (props) => {
  const { field, form, label, placeholder, disabled, style } = props;

  const { name, value } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup check>
      <Label check>
        <Input
          id={name}
          {...field}
          type='checkbox'
          disabled={disabled}
          placeholder={placeholder}
          invalid={showError}
          style={style}
          checked={value}
        />
        {label && <Label for={name}>{label}</Label>}
      </Label>

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
};

InputField.propTypes = {
  // Các props mặc định từ FastField truyền vào
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  // Các props truyền thêm vào
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

export default InputField;
