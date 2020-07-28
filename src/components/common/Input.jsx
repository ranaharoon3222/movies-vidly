import React from 'react';
import TextField from '@material-ui/core/TextField';

// const Input = ({ name, label, value, error, onChange }) => {
const Input = ({ name, error, ...rest }) => {
  return (
    <div>
      <TextField
        {...rest}
        id={name}
        name={name}
        variant='outlined'
        fullWidth
        margin='normal'
        error={error && true}
        helperText={error && error.message}
      />
    </div>
  );
};

export default Input;
