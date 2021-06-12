import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled, style } = props;

  const { name } = field;
  // const { name, value, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Input
        id={name}
        {...field}
        // {...field}
        // <=>
        // name={name}
        // value={value}
        // onChange={onChange}
        // onBlur={onBlur}

        type={type}
        disabled={disabled}
        placeholder={placeholder}
        invalid={showError}
        style={style}
      />

      {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */}
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
