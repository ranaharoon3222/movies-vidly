import React from 'react';

import TextField from '@material-ui/core/TextField';

const tableSearch = (props) => {
  return (
    <div>
      <TextField
        id='standard-basic'
        label='Search'
        onChange={props.onInputChange}
        fullWidth
        variant='filled'
      />
    </div>
  );
};

export default tableSearch;
