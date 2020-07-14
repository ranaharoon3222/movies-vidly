import React from 'react';

import TextField from '@material-ui/core/TextField';

const tableSearch = ({ onInputChange, searchValue }) => {
  return (
    <div>
      <TextField
        id='standard-basic'
        label='Search'
        onChange={onInputChange}
        fullWidth
        variant='filled'
        value={searchValue}
      />
    </div>
  );
};

export default tableSearch;
