import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div>
      <TextField
        id={name}
        onChange={onChange}
        value={value}
        label={label}
        variant='outlined'
        fullWidth
        margin='normal'
        name={name}
        error={error && true}
        helperText={error && error}
      />
    </div>
  );
};

export default Input;
