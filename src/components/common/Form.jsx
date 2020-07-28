import React from 'react';
import Button from '@material-ui/core/Button';
import Joi from 'joi-browser';

const validateProperty = (input, schema) => {
  const obj = { [input.name]: input.value };
  const schema_Property = { [input.name]: schema[input.name] };
  const result = Joi.validate(obj, schema_Property);
  return result.error ? result.error.details[0].message : null;

  // if (input.name === 'username') {
  //   if (input.value.trim() === '') return 'Username is Required';
  // }
  // if (input.name === 'password') {
  //   if (input.value.trim() === '') return 'Password is Required';
  // }
};

export const validateForm = (data, schema) => {
  const options = { abortEarly: false };
  const result = Joi.validate(data, schema, options);

  if (!result.error) return null;

  const error = {};

  for (let item of result.error.details) error[item.path[0]] = item.message;
  return error;

  // const error = {};
  // if (account.username.trim() === '') error.username = 'Username is Required';
  // if (account.password.trim() === '') error.password = 'Password is Required';
  // return Object.keys(error).length === 0 ? null : error;
};

export const handleInputChange = (
  input,
  schema,
  data,
  setData,
  errors,
  setErrors
) => {
  const error = { ...errors };
  const errorMessage = validateProperty(input, schema);
  if (errorMessage) error[input.name] = errorMessage;
  else delete error[input.name];

  const login = { ...data };
  login[input.name] = input.value;
  setData(login);
  setErrors(error);
};

export const handleSubmit = (e, validate, setErrors, doSubmit) => {
  e.preventDefault();
  const error = validate();
  setErrors(error || {});
  if (error) return;
  doSubmit();
};

export const renderSubmitButton = (label, validate) => (
  <Button
    variant='contained'
    color='primary'
    fullWidth
    type='submit'
    disabled={validate() ? true : false}
  >
    {label}
  </Button>
);
